// components/EmployeeReportViewer.tsx
import { ProgressBar } from 'primereact/progressbar';
import { Divider } from 'primereact/divider';
import ComparisonCard from '../../components/comparationCard';
import type { ReporteGeneral } from '../../hooks/core/report';
import '../../styles/employeeReportViewer.css';

interface Props {
    data: ReporteGeneral;
}

export const EmployeeReportViewer = ({ data }: Props) => {
    const total = data.Reporte.Horas_trabajadas + data.Reporte.Horas_Faltas;
    const eficiencia = total === 0 ? 0 : Math.round((data.Reporte.Horas_trabajadas / total) * 100);
    const isHighPerformance = eficiencia > 90;

    return (
        // Añadimos la clase principal 'report-viewer'
        <div className="animate-fadeIn report-viewer">
            
            {/* Header del Reporte */}
            {/* Añadimos la clase 'report-header' */}
            <div className="report-header">
                {/* Añadimos 'report-header-info' */}
                <div className="report-header-info">
                    <h3>Periodo: {data.Reporte.Mes}/{data.Reporte.Ano}</h3>
                    <span>Cédula: {data.Reporte.Cedula}</span>
                </div>
                {/* Añadimos clases condicionales para el badge */}
                <span className={`assistance-badge ${isHighPerformance ? 'badge-success' : 'badge-warning'}`}>
                    {eficiencia}% Asistencia
                </span>
            </div>

            {/* Grid de Tarjetas */}
            {/* Añadimos la clase 'cards-grid' */}
            <div className="cards-grid">
                <ComparisonCard 
                    title="Sueldo"
                    currentValue={data.Reporte.Sueldo_mensual}
                    prevValue={data.Reporte_mes_previo?.Sueldo_mensual}
                    isCurrency={true}
                />
                <ComparisonCard 
                    title="Horas Trabajadas"
                    currentValue={data.Reporte.Horas_trabajadas}
                    prevValue={data.Reporte_mes_previo?.Horas_trabajadas}
                />
                <ComparisonCard 
                    title="Horas Extras"
                    currentValue={data.Reporte.Horas_Extra}
                    prevValue={data.Reporte_mes_previo?.Horas_Extra}
                />
                <ComparisonCard 
                    title="Faltas"
                    currentValue={data.Reporte.Faltas}
                    prevValue={data.Reporte_mes_previo?.Faltas}
                    inverseColors={true}
                />
            </div>

            <Divider />

            {/* Barra de Progreso */}
            {/* Añadimos 'progress-section' */}
            <div className="progress-section">
                {/* Añadimos 'progress-label' */}
                <span className="progress-label">Cumplimiento de Horario</span>
                {/* Quitamos el estilo en línea ya que ahora lo maneja el CSS */}
                <ProgressBar value={eficiencia} showValue={false} color={isHighPerformance ? '#22c55e' : '#eab308'} />
            </div>
        </div>
    );
};