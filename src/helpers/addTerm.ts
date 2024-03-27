import axiosInstance from "axios";

const addTerm = async (term: {
  instructor_id: string;
  date: string;
  end_date: string;
  duration_h: number;
  duration_m: number;
  description: string;
  repeat: string;
}) => {
  try {
    const response = await axiosInstance.post("/api/add-term", term, {
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

export default addTerm;
