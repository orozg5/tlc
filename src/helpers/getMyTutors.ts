import axiosInstance from "axios";

const getMyTutors = async (id: string) => {
  try {
    const response = await axiosInstance.get(`http://localhost:3000/api/get-my-tutors/${id}`, {
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

export default getMyTutors;
