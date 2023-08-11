import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { env } from 'src/env.mjs';
import { z } from 'zod';
import { AUTH_COOKIE_NAME } from '~/constants';

const jwtPayloadSchema = z.object({
  storeUser: z.number(),
  storeHash: z.string(),
});

export function authorize() {
  const token = cookies().get(AUTH_COOKIE_NAME);

  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(token.value, env.JWT_KEY);

    const parsed = jwtPayloadSchema.safeParse(payload);

    if (!parsed.success) {
      return null;
    }

    return parsed.data;
  } catch (err) {
    return null;
  }
}
