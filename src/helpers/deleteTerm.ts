import axiosInstance from "axios";

const deleteTerm = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/delete-term/${id}`, {
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

export default deleteTerm;
