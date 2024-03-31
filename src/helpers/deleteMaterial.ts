import axiosInstance from "axios";

const deleteMaterial = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/delete-material/${id}`, {
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

export default deleteMaterial;
