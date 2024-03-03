import axios from "axios";

const getMe = async () => {
  try {
    const response = await axios.get<{ role: string; id: string; email: string }>("http://localhost:3000/api/me", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching me:", error);
    throw error;
  }
};

export default getMe;
