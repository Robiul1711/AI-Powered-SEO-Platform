import CryptoJS from "crypto-js";

const SECRET_KEY = "pphjobdone-secret-key"; // In production, this should be in an env variable

export const encryptId = (id: string | number): string => {
  return CryptoJS.AES.encrypt(id.toString(), SECRET_KEY).toString()
    .replace(/\+/g, 'p1L2u3S')
    .replace(/\//g, 's1L2a3S4h')
    .replace(/=/g, 'e1Q2u3A4l');
};

export const decryptId = (encryptedId: string): string => {
  const deNormalized = encryptedId
    .replace(/p1L2u3S/g, '+')
    .replace(/s1L2a3S4h/g, '/')
    .replace(/e1Q2u3A4l/g, '=');
  const bytes = CryptoJS.AES.decrypt(deNormalized, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
