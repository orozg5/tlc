import bcrypt from "bcrypt";

export default async function hashPass(unHashPass: string) {
  const hash = await bcrypt.hash(unHashPass, 10);
  return hash;
}
