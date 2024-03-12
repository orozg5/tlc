import axiosInstance from "axios";

const editInstruction = async (editInstruction: any) => {
  try {
    const response = await axiosInstance.patch("/api/edit-instruction", editInstruction, {
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

export default editInstruction;
