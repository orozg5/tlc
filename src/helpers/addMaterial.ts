import IMaterial from "@/interfaces/IMaterial";
import axiosInstance from "axios";

const addMaterial = async (material: IMaterial) => {
  try {
    const response = await axiosInstance.post("/api/add-material", material, {
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

export default addMaterial;
