import axiosInstance from "axios";

const cancelTerm = async (id: string, user_id: string, term: string) => {
  try {
    const response = await axiosInstance.patch("/api/cancel-term", {id, user_id, term}, {
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
