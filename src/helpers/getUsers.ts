import axiosInstance from "axios";

const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/api/users", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default getUsers;
