import axiosInstance from "axios";

const getMyStudents = async (id: string) => {
  try {
    const response = await axiosInstance.get(`http://localhost:3000/api/get-my-students/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getMyStudents;
