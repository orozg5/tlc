import { SignJWT } from "jose";

export async function encrypt(payload: any) {
  const key = new TextEncoder().encode(process.env.ENCRYPTION_KEY);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7 days")
    .sign(key);
}