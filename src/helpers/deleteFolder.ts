import axiosInstance from "axios";

const deleteFolder = async (name: string, path: string, id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/delete-folder/${path}/${name}/${id}`, {
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

export default deleteFolder;
