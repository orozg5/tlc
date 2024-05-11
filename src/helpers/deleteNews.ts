import axiosInstance from "axios";

const deleteNews = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/delete-news/${id}`, {
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

export default deleteNews;
