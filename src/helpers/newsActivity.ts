import INews from "@/interfaces/INews";
import axiosInstance from "axios";

const newsActivity = async (id: string) => {
  try {
    const response = await axiosInstance.patch(
      "/api/news-activity",
      { id },
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

export default newsActivity;
