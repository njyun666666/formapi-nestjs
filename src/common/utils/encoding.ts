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
  const encryptedText = Buffer.concat([cipher.update(input), cipher.final()]);
  return `${encryptedText.toString('base64url')}.${iv.toString('base64url')}`;
};

export const aes256Decrypt = (encryptedText: string, key: string) => {
  const [text, iv] = encryptedText.split('.');
  const decipher = createDecipheriv(
    'aes-256-ctr',
    Buffer.from(key),
    Buffer.from(iv, 'base64url'),
  );
  const decryptedText = Buffer.concat([
    decipher.update(Buffer.from(text, 'base64url')),
    decipher.final(),
  ]);
  return decryptedText.toString('utf8');
};
