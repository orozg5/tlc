import IInstruction from "@/interfaces/IInstruction";
import axiosInstance from "axios";

const createInstruction = async (instruction: IInstruction) => {
  try {
    const response = await axiosInstance.post("/api/create-instruction", instruction, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default createInstruction;
