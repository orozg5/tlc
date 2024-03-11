import axiosInstance from "axios";

const getInstructors = async () => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/get-instructors", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getInstructors;
