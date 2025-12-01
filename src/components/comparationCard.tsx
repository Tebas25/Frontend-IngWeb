import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

interface ComparisonCardProps {
    title: string;
    currentValue: number;
    prevValue: number | undefined | null;
    isCurrency?: boolean; 
    inverseColors?: boolean;
}

const ComparisonCard = ({ title, currentValue, prevValue, isCurrency = false, inverseColors = false }: ComparisonCardProps) => {

    const hasPrevious = prevValue !== null && prevValue !== undefined;
    const diff = hasPrevious ? currentValue - (prevValue as number) : 0;
    const percentage = hasPrevious && prevValue !== 0 
        ? ((diff / (prevValue as number)) * 100).toFixed(1) 
        : 0;
    let severity: 'success' | 'danger' | 'info' = 'info';
    let icon = 'pi pi-minus';

    if (hasPrevious) {
        if (diff > 0) {
            severity = inverseColors ? 'danger' : 'success';
            icon = 'pi pi-arrow-up';
        } else if (diff < 0) {
            severity = inverseColors ? 'success' : 'danger';
            icon = 'pi pi-arrow-down';
        }
    }

    const format = (val: number) => isCurrency 
        ? `$${val.toLocaleString('en-US', { minimumFractionDigits: 2 })}` 
        : val;

    return (
        // Añadimos la clase 'comparison-card' al componente Card de PrimeReact
        <Card className="comparison-card">
            {/* Añadimos 'card-title-row' */}
            <div className="card-title-row">
                {/* Añadimos 'card-title' */}
                <span className="card-title">{title}</span>
                {/* Añadimos 'card-icon' */}
                <i className="pi pi-chart-bar card-icon"></i>
            </div>
            
            {/* Añadimos 'card-value' */}
            <div className="card-value">
                {format(currentValue)}
            </div>

            {hasPrevious ? (
                // Añadimos 'card-comparison'
                <div className="card-comparison">
                    <Tag severity={severity} icon={icon} value={`${Math.abs(Number(percentage))}%`} rounded></Tag>
                    <span>
                        vs mes anterior ({format(prevValue as number)})
                    </span>
                </div>
            ) : (
                // Añadimos 'no-data'
                <span className="no-data">Sin datos previos para comparar</span>
            )}
        </Card>
    );
};

export default ComparisonCard