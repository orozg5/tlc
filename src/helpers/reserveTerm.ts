import axiosInstance from "axios";

const reserveTerm = async (term: {
  term_id: string;
  instructor_id: string;
  student_id: string;
  instruction_id: string;
  reserved: boolean;
}) => {
  try {
    const response = await axiosInstance.patch("/api/reserve-term", term, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default reserveTerm;
