<template>
    <div>
        <el-card v-loading.fullscreen.lock="loading" element-loading-text="Enviando Dados..."
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" class="mt-20">
            <div>
                <div v-if="active === 0">
                    <h2 class="text-2xl font-semibold mb-5">Informações da Vitima</h2>
                    <el-form ref="formPessoa" :model="formPessoa" :rules="formPessoaRules" label-position="top">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <el-form-item label="Nome" prop="nome">
                                    <el-input v-model="formPessoa.nome"></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="RG (Apena números)" prop="rg">
                                    <el-input type="text" maxlength="9" show-word-limit v-mask="['#########']"  v-model="formPessoa.rg"></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Endereço" prop="endereco">
                                    <el-input v-model="formPessoa.endereco"></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Gênero" prop="genero">
                                    <el-input v-model="formPessoa.genero"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div v-if="active === 1">
                    <h2 class="text-2xl font-semibold mb-5">Informações da Vitima</h2>
                    <el-form ref="formVitima" :model="formVitima" :rules="formVitimaRules" label-position="top">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <el-form-item label="E-mail" prop="email">
                                    <el-input v-model="formVitima.email"></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Telefone" prop="telefone">
                                    <el-input  type="text" maxlength="15" show-word-limit v-mask="['(##) ####-####', '(##) #####-####']" v-model="formVitima.telefone"></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Data de nascimento" prop="data_nascimento">
                                    <el-date-picker v-model="formVitima.data_nascimento" type="date"
                                        value-format="yyyy-MM-dd" format="dd/MM/yyyy"
                                        placeholder="Selecione a data de nascimento">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div v-if="active === 2">
                    <h2 class="text-2xl font-semibold mb-5">Informações da Ocorrência</h2>
                    <el-form ref="formOcorrencia" :model="formOcorrencia" :rules="formOcorrenciaRules" label-position="top">
                        <div>
                            <el-form-item label="Descrição" prop="descricao">
                                <el-input type="textarea" rows="4" v-model="formOcorrencia.descricao"></el-input>
                            </el-form-item>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <el-form-item label="Classificação" prop="classificacao">
                                    <el-input v-model="formOcorrencia.classificacao"></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Data da Ocorrência" prop="data_ocorrencia">
                                    <el-date-picker v-model="formOcorrencia.data_ocorrencia" type="date"
                                        value-format="yyyy-MM-dd" format="dd/MM/yyyy" placeholder="Selecione uma data">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Categoria da Ocorrência">
                                    <el-select v-model="formOcorrencia.categoria_uid" placeholder="Categoria da Ocorrência">
                                        <el-option v-for="item in categoriaOptions" :key="item.uid" :label="item.nome"
                                            :value="item.uid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Natureza da Ocorrência" prop="natureza_uid">
                                    <el-select :disabled="!formOcorrencia.categoria_uid"
                                        v-model="formOcorrencia.natureza_uid" placeholder="Natureza da Ocorrência">
                                        <el-option v-for="item in naturezaOptionsFilter" :key="item.uid" :label="item.nome"
                                            :value="item.uid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                        <h2 class="text-2xl font-semibold mb-5">Informações do Autor</h2>
                        <div class="mb-3">
                            Descreva o instrumento portado
                        </div>
                        <div class="mb-5">
                            <el-input placeholder="Descreva o instrumento portado" v-model="instrumento_portado"></el-input>
                        </div>
                        <div class="mb-3">
                            Se houver, descreva o item roubado
                        </div>
                        <div class="mb-5">
                            <el-input placeholder="Se houver, descreva o item roubado" v-model="objeto"></el-input>
                        </div>
                    </el-form>
                </div>
                <div v-if="active === 3">
                    <h2 class="text-2xl font-semibold mb-5">Informações do Vínculo com a Universidade</h2>
                    <el-form ref="formUniversidade" :model="formUniversidade" :rules="formUniversidadeRules"
                        label-position="top">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <el-form-item label="Curso">
                                    <el-input v-model="formUniversidade.curso"></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Matricula">
                                    <el-input type="number" v-model="formUniversidade.matricula"></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Departamento">
                                    <el-input v-model="formUniversidade.departamento"></el-input>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="Vínculo com a universidade" prop="tipo_uid">
                                    <el-select v-model="formUniversidade.tipo_uid" placeholder="selecione um vínculo">
                                        <el-option v-for="item in vinculoOptions" :key="item.uid" :label="item.titulo"
                                            :value="item.uid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                </div>
                <div class="py-3" v-if="active === 4">
                    <h2 class="text-2xl font-semibold mb-5">Informe o Local da Ocorrência</h2>
                    <el-form ref="formLocal" :model="formLocal" :rules="formLocalRules" label-position="top">
                        <el-form-item label="Descreva o local" prop="local">
                            <el-input v-model="formLocal.local"></el-input>
                        </el-form-item>

                        <div class="mb-3">
                            Marque no mapa a localização relativa da ocorrência
                        </div>
                        <el-form-item prop="latitude"></el-form-item>
                        <l-map style="height: 400px;" :zoom="zoom" :center="center" @click="addMarker">
                            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
                            <l-marker v-for="marker in markers" :key="marker.id" :lat-lng="marker.latLng"></l-marker>
                        </l-map>
                    </el-form>
                </div>

                <div v-if="active === 5">
                    <h2 class="text-2xl font-semibold mb-5">Enviando Dados...</h2>
                </div>
                <div  class="flex items-center justify-center card-ocorrencia" v-if="active === 6">
                    <h2 class="flex items-center text-2xl font-semibold mb-5 gap-3"><i style="color: green" class="el-icon-check"></i>Ocorrência Registrada com sucesso</h2>
                    <div class="grid grid-column text-center">
                        <p class="mb-2">Segue abaixo o protocolo:</p>
                        <div class="solicitacoes-content-copiar" :class="{ copied }">
                            <div class="text-2xl font-semibold">{{ ocorrenciaResult.protocolo }}</div>
                            <div>
                                <template  v-if="!copied">
                                    <el-tooltip content="Copiar protocolo" placement="top">
                                        <el-button
                                            icon="el-icon-document-copy"
                                            type="primary" 
                                            plain
                                            @click="copiarDetalhesUid"></el-button>
                                    </el-tooltip>
                                </template>
                                <span class="texto-copiado" v-else>
                                    COPIADO
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-steps v-if="active <= 5" :active="active" finish-status="success">
                <el-step title="Passo 1"></el-step>
                <el-step title="Passo 2"></el-step>
                <el-step title="Passo 3"></el-step>
                <el-step title="Passo 4"></el-step>
                <el-step title="Passo 5"></el-step>
            </el-steps>
        </el-card>
        <div v-if="active <= 5" class="flex justify-between">
            <el-button style="margin-top: 12px;" @click="back">Voltar passo</el-button>
            <el-button style="margin-top: 12px;" @click="next">Próximo passo</el-button>
        </div>
    </div>
</template>

<script>
import mixin from "./RegistroOcorrencoaCriar.mixin"
const requerido = { required: true, message: 'Informe o valor correto', trigger: 'blur' }
const localMapa = { required: true, message: 'Marque no mapa o local da ocorrência', trigger: 'blur' }
export default {
    name: "RegistroOcorrenciaCriarIndex",
    data: () => ({
        loading: false,
        copied: false,
        ocorrenciaResult: {},
        objeto: '',
        active: 0,
        zoom: 12,
        center: [-22.7796, -43.7105],
        markers: [],
        nextMarkerId: 1,
        categoriaOptions: [],
        naturezaOptions: [],
        vinculoOptions: [],
        formPessoa: {
            nome: '',
            rg: null,
            endereco: '',
            genero: '',
        },
        formVitima: {
            email: '',
            data_nascimento: '',
            telefone: '',
        },
        formOcorrencia: {
            descricao: '',
            classificacao: '',
            data_ocorrencia: '',
            natureza_uid: '',
            categoria_uid: '',
        },
        formUniversidade: {
            tipo_uid: '',
            curso: '',
            departamento: '',
            matricula: '',
        },
        instrumento_portado: '',
        formPessoaRules: {
            nome: [requerido],
            rg: [requerido],
            endereco: [requerido],
            genero: [requerido],
        },
        formVitimaRules: {
            email: [requerido, { type: 'email', message: 'E-mail inválido', trigger: 'blur' },],
            data_nascimento: [requerido],
            telefone: [requerido],
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
            local: '',
            latitude: '',
            longitude: '',
        }
    }),
    mixins: [mixin],
    methods: {
        copiarDetalhesUid() {
            const elementoTemporario = document.createElement('textarea');
            elementoTemporario.value = this.ocorrenciaResult.protocolo;
            document.body.appendChild(elementoTemporario);
            elementoTemporario.select();
            document.execCommand('copy');
            this.copied = true;
        },
    }
}
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
    background: var(--neutral-neutral-95, #F2F4F7);
}
.solicitacoes-content-copiar.copied {
    border-radius: 8px;
    background: var(--neutral-neutral-20, #2F3033);
    color: var(--neutral-white, #FFF);
}
.solicitacoes-content-copiar .texto-copiado {
    color: var(--neutral-neutral-70, #A8A8B2);
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
    color: #08CD62;
    font-size: 90px !important;
}
.text-modal-aprovar-recusar {
    font-family: Source Sans Pro;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: 0.35px;
    color: #2F3033;
    margin-top: 3.5rem;
    text-align: center;
}
</style>