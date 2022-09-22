import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";

(window as (Window & typeof globalThis & { sign: (token: string, secret: string, nonce: string) => [string, number]})).sign = function (token: string, secret: string, nonce: string): [string, number] {
    const t = Date.now();
    const string_to_sign = encodeURIComponent(`${token}${t}${nonce}`);
    return [Base64.stringify(hmacSHA256(string_to_sign, secret)), t];
};