export default interface User {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  registration_date: Date;
}