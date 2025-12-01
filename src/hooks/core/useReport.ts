import { useState } from "react";
import { type ReporteGeneral, type ObtenerReporte } from "./report"; 
import { toast } from "react-toastify"; 
import { getReport } from "./report.request";
interface ReturnUseReporte {
    reporte: ReporteGeneral | null;
    loadingReporte: boolean;
    fetchReporte: (datos: ObtenerReporte) => Promise<boolean>; 
    clearReporte: () => void;
}

export const useReporte = (): ReturnUseReporte => {
    const [reporte, setReporte] = useState<ReporteGeneral | null>(null);
    const [loadingReporte, setLoadingReporte] = useState(false);

    const fetchReporte = async (datos: ObtenerReporte): Promise<boolean> => {
        setLoadingReporte(true);
        try {
            const result = await getReport(datos);

            if (!result || !result.Reporte) {
                toast.warning(result.Response_msg || "No se pudo generar el reporte (Faltan datos)");               
                setReporte(null);
                return false; 
            }

            setReporte(result);
            toast.success(result.Response_msg || "Reporte generado con éxito");
            return true;

        } catch (error: any) {
            setReporte(null);
            toast.error("Ocurrió un error de conexión al generar el reporte");
            return false;
        } finally {
            setLoadingReporte(false);
        }
    };

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