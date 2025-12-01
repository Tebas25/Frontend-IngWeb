// ViewEmployeePage.tsx
import Layout from "../../components/layout.component";
import { useSearchParams } from "react-router-dom";
import { useEmployee } from "../../hooks/admin/employees/useEmployeeInfo";
import { useState } from "react";
import Loading from "../../components/Loading.component";
import "../../styles/viewEmployee.css";
import { useSalaryEmployee } from "../../hooks/admin/employees/useSalaryEmployee";

const ViewEmployeePage = () => {
    const [searchParams] = useSearchParams();
    const cedula = searchParams.get('cedula');
    const { employee, loadingEmployee, error, rechargeEmployee } = useEmployee(cedula || undefined);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { salary, loadingSalary, SalaryError } = useSalaryEmployee(cedula || "");


    const handleGenerateReport = () => {
        console.log("Generando reporte:", { startDate, endDate });
        // Aquí iría la lógica para generar el reporte
    };

    const handleManageSchedule = () => {
        console.log("Gestionar horario");
        // Aquí iría la navegación o lógica para gestionar horario
    };

    if (loadingEmployee) {
        return (
            <Layout title="Cargando empleado...">
                <div className="loading-container">
                    <Loading size="large" />
                </div>
            </Layout>
        );
    }

    if (error || !employee) {
        return (
            <Layout title="Error">
                <div className="error-container">
                    <h2>Error al cargar el empleado</h2>
                    <p>{error || "Empleado no encontrado"}</p>
                    <button onClick={rechargeEmployee} className="btn-retry">
                        Reintentar
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title={`Empleado - ${employee.Nombre} ${employee.Apellido}`}>
            <div className="employee-profile">
                {/* Header con información básica */}
                <div className="profile-header">
                    <div className="employee-main-info">
                        <h1 className="employee-name">{employee.Nombre} {employee.Apellido}</h1>
                        <div className="employee-area">{employee.Area}</div>
                    </div>
                    
                    <div className="employee-details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Cargo:</span>
                            <span className="detail-value">{employee.Cargo}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Sueldo por hora:
                                {loadingSalary && "Cargando..."}
                                {!loadingSalary && SalaryError && "Error"}
                                {!loadingSalary && !SalaryError && salary !== null && `$${salary}`}
                            </span>
                            
                        </div>
                    </div>
                </div>

                {/* Paycheck actual */}
                <div className="section paycheck-section">
                    <h2 className="section-title">Paycheck actual</h2>
                    <div className="paycheck-grid">
                        <div className="paycheck-item">
                            <span className="paycheck-label">Período:</span>
                            <span className="paycheck-value">01/01/2024 - 15/01/2024</span>
                        </div>
                        <div className="paycheck-item">
                            <span className="paycheck-label">Horas trabajadas:</span>

                        </div>
                        <div className="paycheck-item">
                        </div>
                    </div>
                </div>

                {/* Reporte de desempeño */}
                <div className="section report-section">
                    <h2 className="section-title">Reporte de desempeño</h2>
                    <div className="report-controls">
                        <div className="date-inputs">
                            <div className="form-field">
                                <label className="input-label">Fecha inicial del reporte</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="date-input"
                                />
                            </div>
                            <div className="form-field">
                                <label className="input-label">Fecha final del reporte</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="date-input"
                                />
                            </div>
                        </div>
                        <button 
                            className="btn-generate-report"
                            onClick={handleGenerateReport}
                            disabled={!startDate || !endDate}
                        >
                            Generar reporte
                        </button>
                    </div>
                </div>

                {/* Acción principal */}
                <div className="actions-section">
                    <button 
                        className="btn-manage-schedule"
                        onClick={handleManageSchedule}
                    >
                        Gestionar horario
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default ViewEmployeePage;