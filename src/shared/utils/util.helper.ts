import * as crypto from 'crypto';

export const formatCurrency = (value: any): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const parseJson = (data: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing json', error);
  }
  return null;
};

export const randomToken = (length = 10) => {
  const byte = Math.ceil(length / 2);
  const res = crypto.randomBytes(byte).toString('hex');
  return length & 1 ? res.slice(0, -1) : res;
};
