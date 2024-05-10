import axiosInstance from "axios";

const addNewComment = async (id: string, student_id: string, comment: string) => {
  try {
    const response = await axiosInstance.post(
      "/api/add-new-comment",
      { id, student_id, comment },
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

export default addNewComment;
