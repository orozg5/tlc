import IForumComment from "@/interfaces/IForumComment";
import axiosInstance from "axios";

const createComment = async (comment: IForumComment) => {
  try {
    const response = await axiosInstance.post("/api/create-comment", comment, {
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

export default createComment;
