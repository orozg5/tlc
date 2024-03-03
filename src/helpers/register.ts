import IRegister from "@/interfaces/IRegister";
import axiosInstance from "axios";

const register = async (user: IRegister) => {
  try {
    const response = await axiosInstance.post("/api/auth/register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default register;
