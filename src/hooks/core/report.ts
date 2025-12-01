interface ReporteMensual {
    Ano: number,
    Mes: number,
    Cedula: string,
    Horas_trabajadas: number,
    Horas_Extra: number,
    Horas_Faltas: number,
    Faltas: number,
    Sueldo_mensual: number,
}

export interface ReporteGeneral {
    Response_msg: string;
    Reporte: ReporteMensual,
    Reporte_mes_previo: ReporteMensual | null,
}

export interface ObtenerReporte {
    Cedula: string,
    Fecha_inicio: string,
}