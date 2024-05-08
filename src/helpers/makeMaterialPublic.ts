import axiosInstance from "axios";

const makeMaterialPublic = async (materialId: string) => {
  try {
    const response = await axiosInstance.patch(
      "/api/make-material-public",
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

export default makeMaterialPublic;
