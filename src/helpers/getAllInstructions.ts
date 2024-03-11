import axiosInstance from "axios";

const getAllInstructions = async () => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/get-all-instructions", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getAllInstructions;
