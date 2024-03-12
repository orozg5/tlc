import axiosInstance from "axios";

const getSubjects = async () => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/get-subjects", {
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

export default getSubjects;
