import { ExportToCsv } from 'export-to-csv';
export const appendQueryString = (url, value) => {
    if (!value) {
        return url;
    } else if (url.indexOf('?') === -1) {
        return url + '?' + value;
    } else {
        return url + '&' + value;
    }
};
export const convertBrlInNumber = value => {
    return value
        .replace(/[^\d,]+/g, '') // Remove unnecessary characters.
        .replace(',', '.');      // Change the decimal separator(`,` -> `.`)
}
export const convertBtcToNumber = value => {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export const convertNumberToBRL = number => {
    return Number(number).toLocaleString('pt-BR')
};

export const downloadBlobCsv = (name, data) => {
    const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        filename: name,
        title: 'Usuários da Oliveira Trust',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data);
};

export const validatePhone = (rule, value, callback) => {
    const phoneRegex = /^(?:(?:\+|00)55\s?)?(?:\(?[1-9][0-9]\)?\s?)?(?:9\d{4}-?\d{4}|[2-8]\d{3}-?\d{4})$/;
    if (!value) {
        return callback(new Error("O telefone é obrigatório."));
    } else if (!phoneRegex.test(value)) {
        return callback(new Error("Formato de telefone inválido."));
    } else {
        callback();
    }
}
export const validateCPF = (rule, value, callback) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!value) {
        return callback(new Error("O CPF é obrigatório."));
    } else if (!cpfRegex.test(value)) {
        return callback(new Error("Formato de CPF inválido."));
    } else if (!isValidCPF(value)) {
        return callback(new Error("CPF inválido."));
    } else {
        callback();
    }
}
export function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

export const genderOptions = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
    { label: 'Transgênero', value: 'transgenero' },
    { label: 'Gênero Neutro', value: 'genero_neutro' },
    { label: 'Não-Binário', value: 'nao_binario' },
    { label: 'Agênero', value: 'agenero' },
    { label: 'Pangênero', value: 'pangenero' },
    { label: 'Genderqueer', value: 'genderqueer' },
    { label: 'Two-Spirit', value: 'two_spirit' },
    { label: 'Terceiro Gênero', value: 'terceiro_genero' },
    { label: 'Outros', value: 'outros' },
]