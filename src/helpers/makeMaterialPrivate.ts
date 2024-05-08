import axiosInstance from "axios";

const makeMaterialPrivate = async (materialId: string) => {
  try {
    const response = await axiosInstance.patch(
      "/api/make-material-private",
      { materialId },
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

export default makeMaterialPrivate;
