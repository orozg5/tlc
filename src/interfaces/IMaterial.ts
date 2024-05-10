export default interface IMaterial {
  material_id?: string;
  instructor_id: string;
  is_public: boolean;
  file_url: string;
  file_name: string;
  path: string;
  subject_id?: string;
}
