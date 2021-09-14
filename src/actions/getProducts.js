import axios from "axios";

export const getAllProducts = async () => {
    const response = await axios.get("/api/interview");
    return response.data;
}