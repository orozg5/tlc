export default interface IInstruction {
  instruction_id?: string,
  instructor_id?: string,
  subject_id?: string,
  price?: number,
  type?: "online" | "irl" | "other",
  description?: string,
  grade?: string
}
