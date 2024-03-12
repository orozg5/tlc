import IUser from "@/interfaces/IUser";
import axiosInstance from "axios";

const updateProfile = async (user: IUser) => {
  try {
    const response = await axiosInstance.patch("/api/update-profile", user, {
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

export default updateProfile;
