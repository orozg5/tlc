import axiosInstance from "axios";

const getTutorFolders = async (req: any) => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/get-tutor-folders", {
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.cookie
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getTutorFolders;
