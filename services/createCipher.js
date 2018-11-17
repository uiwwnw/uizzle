import crypto from 'crypto';
import config from '../config';
 
const key = config.key;      // 암호화, 복호화를 위한 키
 
export function setPw(pw) {
    let cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
    cipher.update(pw, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
    const cipheredOutput = cipher.final('base64');   
    return cipheredOutput;
}

export function getPw(pw) {
    let decipher = crypto.createDecipher('aes192', key); // Decipher 객체 생성
    decipher.update(pw, 'base64', 'utf8');   // 인코딩 방식에 따라 복호화
    const decipheredOutput = decipher.final('utf8');   
    return decipheredOutput;
}
