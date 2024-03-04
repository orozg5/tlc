import { jwtVerify } from "jose";

export async function decrypt(input: string): Promise<any> {
  const key = new TextEncoder().encode(process.env.ENCRYPTION_KEY);
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}