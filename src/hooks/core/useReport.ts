import { useState } from "react";
import { type ReporteGeneral, type ObtenerReporte } from "./report"; // Ajusta la ruta
import { toast } from "react-toastify"; // Opcional, si usas notificaciones
import { getReport } from "./report.request";

interface ReturnUseReporte {
    reporte: ReporteGeneral | null; // El estado puede ser el objeto o null si no se ha buscado
    loadingReporte: boolean;
    fetchReporte: (datos: ObtenerReporte) => Promise<void>;
    clearReporte: () => void;
}

export const useReporte = (): ReturnUseReporte => {
    // 1. Inicializamos en NULL porque al principio no hay reporte cargado
    const [reporte, setReporte] = useState<ReporteGeneral | null>(null);
    const [loadingReporte, setLoadingReporte] = useState(false);

    // 2. Función para llamar a la API (se ejecutará al enviar tu formulario)
    const fetchReporte = async (datos: ObtenerReporte) => {
        setLoadingReporte(true);
        try {
            const result = await getReport(datos);
            setReporte(result);
            toast.success(result.Response_msg);
        } catch (error: any) {
            console.error(error);
            setReporte(null); // Limpiamos si hay error
            toast.error("Error al generar el reporte");
        } finally {
            setLoadingReporte(false);
        }
    };

    // 3. Helper para limpiar el reporte si el usuario quiere hacer otra busqueda limpia
    const clearReporte = () => {
        setReporte(null);
    };

    return {
        reporte,
        loadingReporte,
        fetchReporte,
        clearReporte
    };
};