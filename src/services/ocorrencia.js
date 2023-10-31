import { configAxios } from '@/utils/api-instance';

export const getOcorrenciasListagem = async (params = {}) => {
    const api = configAxios();
    const { data } = await api.get(`registro_ocorrencia/listagem`, { params });
    return data;
}

export const getOcorrenciasDetalhes = async (uid) => {
    const api = configAxios();
    const { data } = await api.get(`registro_ocorrencia/detalhes/${uid}`);
    return data;
}
export const getCategoriaOcorrenciaDados = async () => {
    const api = configAxios();
    const { data } = await api.get(`categoria_ocorrencia/listagem`);
    return data;
}
export const getNaturezaOcorrenciaDados = async () => {
    const api = configAxios();
    const { data } = await api.get(`natureza_ocorrencia/listagem`);
    return data;
}
export const getTiposVinculosUniversidade = async () => {
    const api = configAxios();
    const { data } = await api.get(`tipo_vinculo/listagem`);
    return data;
}

export const postCriarVinculoUniversidade = async (payload) => {
    const api = configAxios();
    const { data: { data } } = await api.post(`vinculo_universidade/criar`, payload);
    return data;
}

export const postCriarPessoa = async (payload) => {
    const api = configAxios();
    const { data: { data } } = await api.post(`pessoa/criar`, payload);
    return data;
}

export const postCriarRegistroOcorrencia = async (payload) => {
    const api = configAxios();
    const { data: { data } } = await api.post(`registro_ocorrencia/criar`, payload);
    return data;
}
export const postCriarItemSubtraido = async (payload) => {
    const api = configAxios();
    const { data: { data } } = await api.post(`item_subtraido/criar`, payload);
    return data;
}
export const pacthStatusRegistroOcorrencia = async (uid, status) => {
    const api = configAxios();
    const { data } = await api.patch(`registro_ocorrencia/mudar_status/${uid}`, { status });
    return data;
}

export const pacthUpdateRegistroOcorrencia = async (uid, payload) => {
    const api = configAxios();
    const { data } = await api.patch(`registro_ocorrencia/atualizar/${uid}`, payload);
    return data;
}
