import { toBase64 } from '../utils';

export const fetchOptions = (
  data: Record<string, string>,
  client: string,
  secret: string
) => ({
  method: 'POST',
  headers: {
    Authorization: `Basic ${toBase64(`${client}:${secret}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  body: new URLSearchParams(data),
});
