import axios from "axios"
import type { ObtenerReporte, ReporteGeneral } from "./report"

const API_BASE = "https://tomas-be.totemdev.pro/core/generate-report"

export const getReport = async(employee: ObtenerReporte) => {
    const response = await axios.post<ReporteGeneral>(`${API_BASE}/obtener-reporte`, employee)
    return response.data;
}