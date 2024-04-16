import axiosInstance from "axios";

const materialShare = async (materialId: string, shareMaterial: any) => {
  try {
    const response = await axiosInstance.post(
      "/api/share-material",
      { materialId, shareMaterial },
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

export default materialShare;
