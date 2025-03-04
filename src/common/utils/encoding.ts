import { createHmac } from 'crypto';

export const sha256 = (input: string, key: string) =>
  createHmac('sha256', key).update(input).digest('hex');
