import axiosInstance from "axios";

const addRating = async (rating: any) => {
  try {
    const response = await axiosInstance.post("/api/add-rating", rating, {
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

export default addRating;
