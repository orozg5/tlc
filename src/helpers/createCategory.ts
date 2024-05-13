import ICategory from "@/interfaces/ICategory";
import axiosInstance from "axios";

const createCategory = async (category: ICategory) => {
  try {
    const response = await axiosInstance.post("/api/create-category", category, {
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

export default createCategory;
