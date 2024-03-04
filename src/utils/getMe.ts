import { parse } from "cookie";
import { decrypt } from "@/utils/decrypt";

export async function getMe(req: any) {
  const cookieValue = parse(req.headers.cookie || "")["session"];
  let userData;
  if (cookieValue) {
    const me = await decrypt(cookieValue);
    userData = {
      id: me.id,
      role: me.role,
      email: me.email,
    };
  }
  return userData;
}
