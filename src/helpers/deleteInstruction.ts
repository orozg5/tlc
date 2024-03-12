import axiosInstance from "axios";

const deleteInstruction = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/delete-instruction/${id}`, {
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

export default deleteInstruction;
