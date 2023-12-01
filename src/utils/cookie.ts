import { Decrypt, Encrypt } from "./crypt";

export const setCookieArray = (name: string, value: any[], days: number) => {
    const serializedArray = JSON.stringify(value);
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (serializedArray || "") + expires + "; path=/";
}

export const setCookie = (name: string, value: string, days: number, encrypt?: boolean) => {
    let convertValue = String(value)
    
    if (encrypt === null) {
        encrypt = false
    }

    if (encrypt) {
        convertValue = Encrypt(String(value))
    }

    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (convertValue || "") + expires + "; path=/";
}

export const getCookieArray = (name: string) => {
    const result = getCookie(name, false)

    if (result) {
        return JSON.parse(result);
    } else {
        return null; // Cookie not found
    }
}

export const getCookie = (name: string, decrypt?: boolean) => {
    if (decrypt === null) {
        decrypt = false
    }
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            if (decrypt) {
                return Decrypt(c.substring(nameEQ.length, c.length))
            }
            return c.substring(nameEQ.length, c.length)
        };
    }
    return null;
}

export const eraseCookie = (name: string) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}