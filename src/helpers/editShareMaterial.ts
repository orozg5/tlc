import axiosInstance from "axios";

const editShareMaterial = async (id: string, date: string) => {
  try {
    const response = await axiosInstance.patch(
      "/api/edit-share-material",
      { id, date },
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

export default editShareMaterial;
