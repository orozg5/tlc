import UserRegister from "@/interfaces/user_register.interface";
import axiosInstance from "axios";

const register = async (user: UserRegister) => {
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
