import INews from "@/interfaces/INews";
import axiosInstance from "axios";

const addNews = async (news: INews) => {
  try {
    const response = await axiosInstance.post("/api/add-news", news, {
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

export default addNews;
