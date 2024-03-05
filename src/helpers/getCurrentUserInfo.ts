import axiosInstance from "axios";

const getCurrentUserInfo = async (req: any) => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/get-current-user-info", {
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.cookie
      },
      
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getCurrentUserInfo;
