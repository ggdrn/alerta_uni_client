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