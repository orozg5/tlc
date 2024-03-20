import axiosInstance from "axios";

const cancelTerm = async (id: string) => {
  try {
    const response = await axiosInstance.patch("/api/cancel-term", id, {
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

export default cancelTerm;
