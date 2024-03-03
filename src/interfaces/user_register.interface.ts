export default interface UserRegister {
  role: "student" | "tutor";
  email: string;
  password: string;
}