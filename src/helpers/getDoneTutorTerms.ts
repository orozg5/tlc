import axiosInstance from "axios";

const getDoneTutorTerms = async (req: any) => {
  try {
    const response = await axiosInstance.get("http://localhost:3000/api/get-done-tutor-terms", {
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

export default getDoneTutorTerms;
