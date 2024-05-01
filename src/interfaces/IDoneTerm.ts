export default interface IDoneTerm {
  term_id: string;
  start: string;
  duration_min: number;
  instruction_id: string;
  price: number;
  user_id: string;
  first_name: string;
  last_name: string;
  profile_photo: string;
  rated: boolean;
  payed: boolean;
  subject_name: string;
};