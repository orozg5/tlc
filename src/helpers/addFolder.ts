import IFolder from "@/interfaces/IFolder";
import axiosInstance from "axios";

const addFolder = async (folder: IFolder) => {
  try {
    const response = await axiosInstance.post("/api/add-folder", folder, {
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

export default addFolder;
