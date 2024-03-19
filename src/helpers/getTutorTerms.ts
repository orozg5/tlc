import axiosInstance from "axios";

const getTutorTerms = async (id: string) => {
  try {
    const response = await axiosInstance.get(`http://localhost:3000/api/get-tutor-terms/${id}`, {
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

export default getTutorTerms;
