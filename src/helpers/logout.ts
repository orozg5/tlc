import axiosInstance from "axios";

const logout = async () => {
  try {
    const response = await axiosInstance.post("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export default logout;
