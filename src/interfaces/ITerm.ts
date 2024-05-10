export default interface ITerm {
  term_id: string;
  instructor_id: string;
  instruction_id?: string;
  student_id?: string;
  start: string;
  duration_min: number;
  description: string;
  reserved: boolean;
  is_public: boolean;
};
