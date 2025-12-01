import axios from "axios";
import type { NewUser } from "../admin";

const API_BASE = "https://tomas-be.totemdev.pro/login";

export const createUser = async (user: NewUser) => {
    const response = await axios.post(`${API_BASE}/create-user`, user);
    return response.data;
}