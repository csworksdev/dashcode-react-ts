import CryptoJS from 'crypto-js';

const CONST_SECRET_AES = 'cSuuaUmLReTdGG5LxQor'
export const Decrypt = (chipher: string) => {
    try {
        return CryptoJS.AES.decrypt(chipher, CONST_SECRET_AES || '').toString(CryptoJS.enc.Utf8);
    } catch (error) {
        return 'FORBIDDEN';
    }
};

export const Encrypt = (value: string) => {
    return CryptoJS.AES.encrypt(value, CONST_SECRET_AES || '').toString();
};