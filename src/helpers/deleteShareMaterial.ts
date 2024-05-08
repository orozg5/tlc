import axiosInstance from "axios";

const deleteShareMaterial = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/delete-share-material/${id}`, {
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

export default deleteShareMaterial;
