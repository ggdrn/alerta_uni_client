import { configAxios } from '@/utils/api-instance';

export const getOcorrenciasListagem = async (params = {}) => {
    const api = configAxios();
    const { data } = await api.get(`registro_ocorrencia/listagem`, { params });
    return data;
}