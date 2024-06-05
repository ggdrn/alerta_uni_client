<template>
    <div>
        <el-page-header
            v-if="isEditar"
            content="Editar um Registro de Ocorrência"
            @back="goBack"
        />

        <el-card
            v-loading.fullscreen.lock="loading"
            element-loading-text="Enviando Dados..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            class="mt-20"
        >
            <div class="mb-5">
                <el-alert
                    v-if="erros.length"
                    title="Não foi possível processar a requsição"
                    type="error"
                    :description="makeErros"
                    show-icon
                    :closable="false"
                />
            </div>
            <div>
                <div
                    v-if="active < 5 && !isEditar"
                    class="flex justify-between mt-4 mb-10"
                >
                    <el-button
                        style="margin-top: 12px"
                        @click="back"
                    >
                        Voltar passo
                    </el-button>
                    <el-button
                        style="margin-top: 12px"
                        @click="next"
                    >
                        Próximo passo
                    </el-button>
                </div>
                <el-steps
                    v-if="active < 5 && !isEditar"
                    :active="active"
                    finish-status="success"
                    class="mb-7"
                >
                    <el-step title="Passo 1" />
                    <el-step title="Passo 2" />
                    <el-step title="Passo 3" />
                    <el-step title="Passo 4" />
                    <el-step title="Passo 5" />
                </el-steps>
                <div v-if="active === 0 || isEditar">
                    <h2 class="text-2xl font-semibold mb-5">
                        Informações da Vitima
                    </h2>
                    <el-form
                        ref="formPessoa"
                        :disabled="loading"
                        :model="formPessoa"
                        :rules="formPessoaRules"
                        label-position="top"
                    >
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <el-form-item
                                    label="Nome"
                                    prop="nome"
                                >
                                    <el-input v-model="formPessoa.nome" />
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item
                                    label="CPF (Apena números)"
                                    prop="rg"
                                >
                                    <el-input
                                        v-model="formPessoa.rg"
                                        v-mask="['###.###.###-##']"
                                        type="text"
                                        maxlength="14"
                                        show-word-limit
                                    />
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item
                                    label="Endereço"
                                    prop="endereco"
                                >
                                    <el-input v-model="formPessoa.endereco" />
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item
                                    label="Gênero"
                                    prop="genero"
                                >
                                    <el-select
                                        v-model="formPessoa.genero"
                                        placeholder="Selecione o gênero"
                                    >
                                        <el-option
                                            v-for="(item, index) in genderOptions"
                                            :key="index"
                                            :label="item.label"
                                            :value="item.value"
                                        />
                                    </el-select>
                                    <!-- <el-input v-model="" /> -->
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div v-if="active === 1 || isEditar">
                    <h2 class="text-2xl font-semibold mb-5">
                        Informações da Vitima
                    </h2>
                    <el-form
                        ref="formVitima"
                        :model="formVitima"
                        :rules="formVitimaRules"
                        :disabled="loading"
                        label-position="top"
                    >
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <el-form-item
                                    label="E-mail"
                                    prop="email"
                                >
                                    <el-input v-model="formVitima.email" />
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item
                                    label="Telefone"
                                    prop="telefone"
                                >
                                    <el-input
                                        v-model="formVitima.telefone"
                                        v-mask="['(##) ####-####', '(##) #####-####']"
                                        type="text"
                                    />
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item
                                    label="Data de nascimento"
                                    prop="data_nascimento"
                                >
                                    <el-date-picker
                                        v-model="formVitima.data_nascimento"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        format="dd/MM/yyyy"
                                        placeholder="Selecione a data de nascimento"
                                    />
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div v-if="active === 2 || isEditar">
                    <h2 class="text-2xl font-semibold mb-5">
                        Informações da Ocorrência
                    </h2>
                    <el-form
                        ref="formOcorrencia"
                        :model="formOcorrencia"
                        :rules="formOcorrenciaRules"
                        :disabled="loading"
                        label-position="top"
                    >
                        <div>
                            <el-form-item
                                label="Descrição"
                                prop="descricao"
                            >
                                <el-input
                                    v-model="formOcorrencia.descricao"
                                    type="textarea"
                                    rows="4"
                                />
                            </el-form-item>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <el-form-item
                                    label="Classificação"
                                    prop="classificacao"
                                >
                                    <el-input v-model="formOcorrencia.classificacao" />
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item
                                    label="Data da Ocorrência"
                                    prop="data_ocorrencia"
                                >
                                    <el-date-picker
                                        v-model="formOcorrencia.data_ocorrencia"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        format="dd/MM/yyyy"
                                        placeholder="Selecione uma data"
                                    />
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Categoria da Ocorrência">
                                    <el-select
                                        v-model="formOcorrencia.categoria_uid"
                                        placeholder="Categoria da Ocorrência"
                                    >
                                        <el-option
                                            v-for="item in categoriaOptions"
                                            :key="item.uid"
                                            :label="item.nome"
                                            :value="item.uid"
                                        />
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item
                                    label="Natureza da Ocorrência"
                                    prop="natureza_uid"
                                >
                                    <el-select
                                        v-model="formOcorrencia.natureza_uid"
                                        :disabled="!formOcorrencia.categoria_uid"
                                        placeholder="Natureza da Ocorrência"
                                    >
                                        <el-option
                                            v-for="item in naturezaOptionsFilter"
                                            :key="item.uid"
                                            :label="item.nome"
                                            :value="item.uid"
                                        />
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <h2 class="text-2xl font-semibold mb-5">
                            Informações do Autor
                        </h2>
                        <div class="mb-3">
                            Descreva o instrumento portado
                        </div>
                        <div class="mb-5">
                            <el-input
                                v-model="instrumento_portado"
                                placeholder="Descreva o instrumento portado"
                            />
                        </div>
                        <div class="mb-3">
                            Se houver, descreva o item roubado
                        </div>
                        <div class="mb-5">
                            <el-input
                                v-model="objeto"
                                placeholder="Se houver, descreva o item roubado"
                            />
                        </div>
                    </el-form>
                </div>
                <div v-if="active === 3 || isEditar">
                    <h2 class="text-2xl font-semibold mb-5">
                        Informações do Vínculo com a Universidade
                    </h2>
                    <el-form
                        ref="formUniversidade"
                        :model="formUniversidade"
                        :disabled="loading"
                        :rules="formUniversidadeRules"
                        label-position="top"
                    >
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <el-form-item label="Curso">
                                    <el-input v-model="formUniversidade.curso" />
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Matricula">
                                    <el-input
                                        v-model="formUniversidade.matricula"
                                        type="number"
                                    />
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Departamento">
                                    <el-input v-model="formUniversidade.departamento" />
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item
                                    label="Vínculo com a universidade"
                                    prop="tipo_uid"
                                >
                                    <el-select
                                        v-model="formUniversidade.tipo_uid"
                                        placeholder="selecione um vínculo"
                                    >
                                        <el-option
                                            v-for="item in vinculoOptions"
                                            :key="item.uid"
                                            :label="item.titulo"
                                            :value="item.uid"
                                        />
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div
                    v-if="active === 4 || isEditar"
                    class="py-3"
                >
                    <h2 class="text-2xl font-semibold mb-5">
                        Informe o Local da Ocorrência
                    </h2>
                    <el-form
                        ref="formLocal"
                        :model="formLocal"
                        :disabled="loading"
                        :rules="formLocalRules"
                        label-position="top"
                    >
                        <el-form-item
                            label="Descreva o local"
                            prop="local"
                        >
                            <el-input v-model="formLocal.local" />
                        </el-form-item>

                        <div class="mb-3">
                            Marque no mapa a localização relativa da ocorrência
                        </div>
                        <el-form-item prop="latitude" />
                        <l-map
                            style="height: 400px"
                            :zoom="zoom"
                            :center="center"
                            @click="addMarker"
                        >
                            <l-tile-layer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <l-marker
                                v-for="marker in markers"
                                :key="marker.id"
                                :lat-lng="marker.latLng"
                            />
                        </l-map>
                    </el-form>
                </div>

                <div v-if="active === 5">
                    <h2 class="text-2xl font-semibold mb-5">
                        Enviando Dados...
                    </h2>
                </div>
                <div
                    v-if="active === 6"
                    class="flex items-center justify-center card-ocorrencia"
                >
                    <h2 class="flex items-center text-2xl font-semibold mb-5 gap-3">
                        <i
                            style="color: green"
                            class="el-icon-check"
                        />Ocorrência Registrada com
                        sucesso
                    </h2>
                    <div class="grid grid-column text-center">
                        <p class="mb-2">
                            Segue abaixo o protocolo:
                        </p>
                        <div
                            class="solicitacoes-content-copiar"
                            :class="{ copied }"
                        >
                            <div class="text-2xl font-semibold">
                                {{ ocorrenciaResult.protocolo }}
                            </div>
                            <div>
                                <template v-if="!copied">
                                    <el-tooltip
                                        content="Copiar protocolo"
                                        placement="top"
                                    >
                                        <el-button
                                            icon="el-icon-document-copy"
                                            type="primary"
                                            plain
                                            @click="copiarDetalhesUid"
                                        />
                                    </el-tooltip>
                                </template>
                                <span
                                    v-else
                                    class="texto-copiado"
                                > COPIADO </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <div
            v-if="isEditar"
            class="flex justify-end mt-3"
        >
            <el-button
                type="success"
                icon="el-icon-s-promotion"
                @click="atualizarOcorrencia"
            >
                Salvar Alterações
            </el-button>
        </div>
    </div>
</template>

<script>
import mixin from "./RegistroOcorrencoaCriar.mixin";
const requerido = { required: true, message: "Informe o valor correto", trigger: "blur" };
import { validateCPF, validatePhone, genderOptions } from "@/utils";
const localMapa = {
    required: true,
    message: "Marque no mapa o local da ocorrência",
    trigger: "blur",
};
export default {
    name: "RegistroOcorrenciaCriarIndex",
    mixins: [mixin],
    data: () => {
        return {
            erros: [],
            loading: false,
            copied: false,
            ocorrenciaResult: {},
            objeto: "",
            active: 0,
            zoom: 12,
            center: [-22.7796, -43.7105],
            markers: [],
            nextMarkerId: 1,
            categoriaOptions: [],
            naturezaOptions: [],
            vinculoOptions: [],
            updateOcorrencia: {},
            formPessoa: {
                nome: "",
                rg: null,
                endereco: "",
                genero: "",
            },
            formVitima: {
                email: "",
                data_nascimento: "",
                telefone: null,
            },
            formOcorrencia: {
                descricao: "",
                classificacao: "",
                data_ocorrencia: "",
                natureza_uid: "",
                categoria_uid: "",
            },
            formUniversidade: {
                tipo_uid: "",
                curso: "",
                departamento: "",
                matricula: "",
            },
            instrumento_portado: "",
            formPessoaRules: {
                nome: [requerido],
                rg: [requerido, validateCPF],
                endereco: [requerido],
                genero: [requerido],
            },
            formVitimaRules: {
                email: [
                    requerido,
                    { type: "email", message: "E-mail inválido", trigger: "blur" },
                ],
                data_nascimento: [requerido],
                telefone: [requerido, validatePhone],
            },
            formOcorrenciaRules: {
                descricao: [requerido],
                classificacao: [requerido],
                data_ocorrencia: [requerido],
                natureza_uid: [requerido],
            },
            formUniversidadeRules: {
                tipo_uid: [requerido],
            },
            formLocalRules: {
                local: [requerido],
                latitude: [localMapa],
            },
            formLocal: {
                local: "",
                latitude: "",
                longitude: "",
            },
            genderOptions,
        };
    },
    computed: {
        makeErros() {
            let string =  "";
            this.erros.map(erro => string += erro.message + "\n")
            return string;
        },
    },
    methods: {
        copiarDetalhesUid() {
            const elementoTemporario = document.createElement("textarea");
            elementoTemporario.value = this.ocorrenciaResult.protocolo;
            document.body.appendChild(elementoTemporario);
            elementoTemporario.select();
            document.execCommand("copy");
            this.copied = true;
        },
    },
};
</script>

<style lang="scss">
.el-select {
  width: 100%;
}

.card-ocorrencia {
  height: 300px;
  flex-direction: column;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100% !important;
}
.solicitacoes-content-copiar {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 12px;
  align-items: center;
  border-radius: 8px;
  background: var(--neutral-neutral-95, #f2f4f7);
}
.solicitacoes-content-copiar.copied {
  border-radius: 8px;
  background: var(--neutral-neutral-20, #2f3033);
  color: var(--neutral-white, #fff);
}
.solicitacoes-content-copiar .texto-copiado {
  color: var(--neutral-neutral-70, #a8a8b2);
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.solicitacoes-info-texto-modal {
  color: var(--neutral-neutral-50, #707077);
  text-align: center;
  /* Regular/16 • Body • Regular */
  font-family: Source Sans Pro;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.1px; /* 119.375% */
  margin-top: 22px;
}
.aprovar-icone {
  color: #08cd62;
  font-size: 90px !important;
}
.text-modal-aprovar-recusar {
  font-family: Source Sans Pro;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.35px;
  color: #2f3033;
  margin-top: 3.5rem;
  text-align: center;
}
</style>
