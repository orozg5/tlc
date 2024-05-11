import axiosInstance from "axios";

const getAllNews = async () => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/get-all-news", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getAllNews;
