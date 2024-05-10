import axiosInstance from "axios";

const makeTermPublicOrPrivate = async (id: string) => {
  try {
    const response = await axiosInstance.patch(
      "/api/make-term-public-or-private",
      { id },
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

export default makeTermPublicOrPrivate;
