import CryptoJS from 'crypto-js';
import config from '../config/config';

export class Common {
    static CheckVariableNotNull (variable:unknown): boolean {
        return variable != undefined && variable != null;
    }

    static encrypt(data: any): string {
        let message: string = '';
        if(!(data instanceof String)) message = JSON.stringify(data);
        else message = data as string;
        const secrectkey: string = config.secrectkey;
        const vi = secrectkey.split('').slice(0, 8).join('');
        const cripher: CryptoJS.lib.CipherParams = CryptoJS.TripleDES.encrypt(message, CryptoJS.enc.Utf8.parse(secrectkey), {
            iv: CryptoJS.enc.Utf8.parse(vi),
            mode: CryptoJS.mode.CBC
        });
        return cripher.toString();
    }

    static decrypt(cripherText: string): any {
        const secrectkey: string = config.secrectkey;
        const vi = secrectkey.split('').slice(0, 8).join('');
        const wordArray: CryptoJS.lib.WordArray = CryptoJS.TripleDES.decrypt(cripherText, CryptoJS.enc.Utf8.parse(secrectkey), {
            iv: CryptoJS.enc.Utf8.parse(vi),
            mode: CryptoJS.mode.CBC
        });
        return JSON.parse(wordArray.toString(CryptoJS.enc.Utf8));
    }

    static booleanify(value: string): boolean {
        const truety = [
            'true',
            'TRUE',
            '1'
        ];
        return truety.includes(value);
    }

    static paddWithLeadingZeros(num: number, totalLengt: number): string {
        return String(num).padStart(totalLengt, '0');
    }
};