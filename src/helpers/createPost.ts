import IPost from "@/interfaces/IPost";
import axiosInstance from "axios";

const createPost = async (post: IPost) => {
  try {
    const response = await axiosInstance.post("/api/create-post", post, {
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

export default createPost;
