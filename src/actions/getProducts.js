import axios from "axios";

//returns a JSON object that contains the product details
export const getProducts = async () => {
    const response = await axios.get("/api/interview");
    return response.data;
}