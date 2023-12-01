import toast from "react-hot-toast";

export const isNumber = (value?: string | number): boolean => {
    return ((value != null) &&
        (value !== '') &&
        !isNaN(Number(value.toString())));
}

export const catchDefaultError = (error: any) => {
    console.log('error', error)
    if (error.response == null) {
        if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
            toast.error(`Gagal memproses permintaan, Timeout | Network Error - Can't contact The Service`);
            return
        }
    }
    
    if (error.response != null && error.response.data != null && error.response.data.msg === 'Token is expired') {
        toast.error('Oops!.. Sesi telah habis, Anda akan diarahkan ke halaman login')
        window.location.href = '/logout'
        return
    }

    if (error.response && error.response.data) {

        if (error.response.status === 422 && error.response.data != null && error.response.data.fields != null && error.response.data.fields.length > 0) {
            for (let i = 0; i < error.response.data.fields.length; i++) {
                toast.error(error.response.data.fields[i].message);
            }
            return
        }
        
        const responseData = error.response.data;

        if (responseData.error != null) {
            toast.error(responseData.msg);
        } else if (Array.isArray(responseData)) {
            responseData.forEach((item) => {
                if (item.Message) {
                    toast.error(item.Message);
                }
            });
        } else if (responseData.message != null) {
            const errorMessage = Array.isArray(responseData.message)
                ? responseData.message.join(", ")
                : responseData.message;

            if (errorMessage === '') {
                toast.error(`${error.response.status} - ${error.response.statusText}`);
            } else {
                toast.error(errorMessage);
            }
        } else {
            toast.error(`${error.response.status} - ${error.response.statusText}`);
        }
    }
}