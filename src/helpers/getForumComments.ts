import axiosInstance from "axios";

const getForumComments = async () => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/get-forum-comments", {
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

export default getForumComments;
