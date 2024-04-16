import axiosInstance from "axios";

const editFolder = async (folderId: string, newFolderName: string, path: string, folderName: string) => {
  try {
    const response = await axiosInstance.patch(
      "/api/edit-folder",
      { folderId, newFolderName, path, folderName },
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

export default editFolder;
