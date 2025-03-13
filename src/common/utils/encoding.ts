import {
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
} from 'crypto';

export const sha256 = (input: string, key: string) =>
  createHmac('sha256', key).update(input).digest('base64url');

export const aes256 = (input: string, key: string) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-ctr', Buffer.from(key), iv);
  const encryptedText = Buffer.concat([
    iv,
    cipher.update(input),
    cipher.final(),
  ]);
  return encryptedText.toString('base64url');
};

export const aes256Decrypt = (encryptedText: string, key: string) => {
  const buffer = Buffer.from(encryptedText, 'base64url');
  const iv = buffer.subarray(0, 16);
  const text = buffer.subarray(16);
  const decipher = createDecipheriv('aes-256-ctr', Buffer.from(key), iv);
  const decryptedText = Buffer.concat([
    decipher.update(text),
    decipher.final(),
  ]);
  return decryptedText.toString('utf8');
};
