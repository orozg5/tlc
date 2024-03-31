import axiosInstance from "axios";

const editMaterial = async (materialId: string, newName: string) => {
  try {
    const response = await axiosInstance.patch(
      "/api/edit-material",
      { materialId, newName },
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

export default editMaterial;
