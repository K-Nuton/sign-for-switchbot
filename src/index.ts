import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

(window as (Window & typeof globalThis & { s: typeof s })).s = s;

function s(token: string, secret: string): [string, string, number] {
    const chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('');
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case 'x':
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case 'y':
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }

    const nonce = chars.join("");
    const t = Date.now();
    
    return [Base64.stringify(HmacSHA256(encodeURIComponent(`${token}${t}${nonce}`), secret)), nonce, t];
}
