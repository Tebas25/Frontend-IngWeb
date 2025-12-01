import axios from "axios";
import type { ReturnSeasons, Season } from "../admin";
import type  {AssingSchedule}  from "./schedule";

const API_BASE = "https://tomas-be.totemdev.pro/admin/horario";

export const fetchGetAllSeasons = async (): Promise<ReturnSeasons[]> => {
    try {
        const url = `${API_BASE}/obtener-temporadas-all`;
        const { data } = await axios.get(url);
        if (data && data.data) {
            return data.data;
        } else if (Array.isArray(data)) {
            return data;
        } else {
            return [];
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message || "Error al obtener temporadas");
    }
}

export const createSeason = async (season: Season) => {
    const response = await axios.post(`${API_BASE}/ingresar-temporada`, season);
    return response.data;
}


export const assingSchedule = async(schedule: AssingSchedule) => {
    const response = await axios.post(`${API_BASE}/asignar-horario`, schedule)
    return response.data;
}