import INews from "@/interfaces/INews";
import axiosInstance from "axios";

const editNews = async (newsId: string, news: INews) => {
  try {
    const response = await axiosInstance.patch(
      "/api/edit-news",
      { newsId, news },
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

export default editNews;
