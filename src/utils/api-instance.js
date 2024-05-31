import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import { backendBaseURL } from '@/utils/end-points';

// If you enter any token without a header
export const headerAxios = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return {
        Authorization: user?.token ?? false,
    };
};

// convert to the default of js Camel Case
export const configAxios = () =>
    applyCaseMiddleware(
        axios.create({
            headers: headerAxios(),
            baseURL: backendBaseURL,
        })
    );