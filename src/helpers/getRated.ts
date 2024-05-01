import axiosInstance from "axios";

const getRated = async (req: any) => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/get-rated", {
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.cookie
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getRated;
