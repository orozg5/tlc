export default interface IUser {
  id: string;
  role: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  school?: string;
  grade?: string;
  educational_attainment?: string;
  finished_school?: string;
  description?: string;
  address: string;
  phone?: string;
  profile_photo_url?: string;
}
