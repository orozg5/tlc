import axiosInstance from "axios";

const addAvailability = async (availability: {
  instructor_id: string;
  date: string;
  duration_h: number;
  duration_m: number;
  description: string;
  repeat: string;
}) => {
  try {
    const response = await axiosInstance.post("/api/add-availability", availability, {
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

export default addAvailability;
