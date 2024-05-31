<template>
    <div class="bg-gray-100 flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-md w-80">
            <h1 class="text-2xl font-semibold mb-6">
                ACESSAR SISTEMA
            </h1>
            <el-form
                ref="loginForm"
                :model="loginData"
                :rules="loginRules"
                label-position="top"
            >
                <div>
                    <el-form-item
                        label="E-mail"
                        prop="email"
                    >
                        <el-input v-model="loginData.email" />
                    </el-form-item>
                </div>
                <div>
                    <el-form-item
                        label="Senha"
                        prop="password"
                    >
                        <el-input
                            v-model="loginData.password"
                            type="password"
                        />
                    </el-form-item>
                </div>
                <el-form-item class="mt-12">
                    <el-button
                        :loading="loading"
                        type="success"
                        @click="login"
                    >
                        Entrar
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { userLogin } from "@/services/users"
export default {
    name: 'Login',
    data() {
        return {
            loginData: {
                email: '',
                password: '',
            },
            loading: false,
            loginRules: {
                email: [
                    { required: true, message: 'Informe o e-mail', trigger: 'blur' },
                    { type: 'email', message: 'E-mail inválido', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Informe a senha', trigger: 'blur' },
                    { min: 8, message: 'A senha deve ter pelo menos 8 caracteres', trigger: 'blur' },
                    { validator: this.validatePassword, trigger: 'blur' },
                ],
            },
        };
    },
    methods: {
        async login() {
            try {
                this.loading = true;
                this.$refs.loginForm.validate(async (valid) => {
                    if (valid) {
                        // Executar a lógica de login aqui
                        const usuario = await userLogin(this.loginData.email, this.loginData.password)
                            .catch(error => {
                                this.$notify({
                                    title: 'Falha ao acessar o sistema',
                                    message: error?.response?.data?.message || 'Não foi possível fazer login com as crendencias fornecidas',
                                    type: 'error',
                                });
                                return false;
                            });
                        if (usuario) {
                            const { message } = usuario;
                            delete usuario.message
                            sessionStorage.setItem("user", JSON.stringify(usuario));
                            this.$notify({
                                title: 'Sucesso',
                                message,
                                type: 'success',
                            });
                            this.$router.push({ name: "RegistroOcorrenciaLisagem" })
                        }

                    }
                });
            } catch (e) {
                this.$notify({
                    title: 'Falha ao acessar o sistema',
                    message: 'Não foi possível fazer login com as crendencias fornecidas',
                    type: 'error',
                });
            } finally {
                this.loading = false;
            }
        },
        validatePassword(rule, value, callback) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (regex.test(value)) {
                callback();
            } else {
                callback(new Error('A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'));
            }
        },
    },
};
</script>