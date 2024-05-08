import axiosInstance from "axios";

const cancelRating = async (termId: string) => {
  try {
    const response = await axiosInstance.patch(
      "/api/cancel-rating",
      { termId },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export default cancelRating;
