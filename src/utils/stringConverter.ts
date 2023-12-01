export const ToTitleCase = (str: string) => {
    if (str == null) {
        return ''
    }
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

export const LimitString = (str: string, limit: number) => {
    if (str == null) {
        return ''
    }

    if (str.length > limit) {
        let newString = str.substring(0, limit) + ' ...'
        return newString
    }
    return str
}

export const randomString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export const checkJenisLs = (value: string) => {

    if (value == null || value === '') {
        return ''
    }

    if (value.toLowerCase() === 'barangjasa') {
        return 'Barang dan Jasa'
    } else if (value.toLowerCase() === 'gaji') {
        return 'Gaji'
    } else if (value.toLowerCase() === 'tpp') {
        return 'TPP'
    } else if (value.toLowerCase() === 'kontraktual') {
        return 'Kontraktual'
    }
    return value
}



export const converNamaSkpd = (nama_skpd: string) => {

    if (nama_skpd == null) {
        return '-'
    }

    let printedNamaSkpd = ''
    if (nama_skpd != null) {
        let caseNamaSkpd = nama_skpd.toLowerCase().split(' ')
        console.log('caseNamaSkpd', caseNamaSkpd)
        if (caseNamaSkpd[0] === 'kecamatan') {
            printedNamaSkpd = 'CAMAT'
            for (let i = 1; i < caseNamaSkpd.length; i++) {
                printedNamaSkpd += ' ' + caseNamaSkpd[i].toUpperCase()
            }
        } else if (caseNamaSkpd[0] === 'inspektorat') {
            printedNamaSkpd = 'INSPEKTUR'
            for (let i = 1; i < caseNamaSkpd.length; i++) {
                printedNamaSkpd += ' ' + caseNamaSkpd[i].toUpperCase()
            }
        } else if (caseNamaSkpd[0] === 'sekretariat' && caseNamaSkpd[1] === 'daerah') {
            printedNamaSkpd = 'SEKRETARIS DAERAH'
            for (let i = 2; i < caseNamaSkpd.length; i++) {
                printedNamaSkpd += ' ' + caseNamaSkpd[i].toUpperCase()
            }
        } else if (caseNamaSkpd[0] === 'setda') {
            printedNamaSkpd = 'SEKRETARIS DAERAH'
            for (let i = 1; i < caseNamaSkpd.length; i++) {
                printedNamaSkpd += ' ' + caseNamaSkpd[i].toUpperCase()
            }
        } else if (caseNamaSkpd[0] === 'sekretariat' && caseNamaSkpd[1] === 'dprd') {
            printedNamaSkpd = 'SEKRETARIS DPRD'
            for (let i = 2; i < caseNamaSkpd.length; i++) {
                printedNamaSkpd += ' ' + caseNamaSkpd[i].toUpperCase()
            }
        } else if (caseNamaSkpd[0] === 'dprd') {
            printedNamaSkpd = 'SEKRETARIS DPRD'
            for (let i = 1; i < caseNamaSkpd.length; i++) {
                printedNamaSkpd += ' ' + caseNamaSkpd[i].toUpperCase()
            }
        } else {
            printedNamaSkpd = 'KEPALA ' + nama_skpd.toUpperCase()
        }
    }

    return printedNamaSkpd
}