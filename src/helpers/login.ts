import axiosInstance from "axios";

const login = async (user: {email: string; password: string}) => {
  try {
    const response = await axiosInstance.post("/api/auth/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default login;
