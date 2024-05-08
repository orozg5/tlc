import axiosInstance from "axios";

const payTutor = async (productId: string) => {
  try {
    const response = await axiosInstance.patch(
      "/api/pay-tutor",
      { productId },
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

export default payTutor;
