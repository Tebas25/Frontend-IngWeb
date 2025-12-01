import Layout from "../../components/layout.component";
import { useSearchParams } from "react-router-dom";
import { useEmployee } from "../../hooks/admin/employees/useEmployeeInfo";
import { useState } from "react";
import Loading from "../../components/Loading.component";
import "../../styles/viewEmployee.css";
import { useSalaryEmployee } from "../../hooks/admin/employees/useSalaryEmployee";
import Modal from "../../components/modal";
import { useCreateSchedule } from "../../hooks/admin/seasonsAndSchedule/useCreateSchedule";
import { ScheduleForm } from "./NewSchedule";
import { useReporte } from "../../hooks/core/useReport";
import { EmployeeReportViewer } from "../../pages/Report/ViewReportPage";
import { toast } from "react-toastify";

const ViewEmployeePage = () => {
    const [searchParams] = useSearchParams();
    const cedula = searchParams.get('cedula');
    
    const { employee, loadingEmployee, error, rechargeEmployee } = useEmployee(cedula || undefined);
    const { salary, loadingSalary, SalaryError } = useSalaryEmployee(cedula || "");
    const { handleCreateSchedule, hookForm, loadingCreateSchedule } = useCreateSchedule();

    // --- LÓGICA DEL REPORTE ---
    const [startDate, setStartDate] = useState(""); 
    
    const { fetchReporte, reporte, loadingReporte } = useReporte();
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const handleGenerateReport = async () => {
        if (!startDate) {
            toast.warning("Por favor selecciona una fecha");
            return;
        }
        if (!cedula) {
            toast.error("No se encontró la cédula del empleado");
            return;
        }

        console.log("Generando reporte para:", { cedula, startDate });

        await fetchReporte({
            Cedula: cedula,
            Fecha_inicio: startDate
        });
        setIsReportModalOpen(true);
    };

    const closeReportModal = () => {
        setIsReportModalOpen(false);
    };


    // --- MODALES DE HORARIO ---
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        hookForm.reset();
    };

    
    if (loadingEmployee) {
        return (
            <Layout title="Cargando empleado...">
                <div className="loading-container"><Loading size="large" /></div>
            </Layout>
        );
    }

    if (error || !employee) {
        return (
            <Layout title="Error">
                <div className="error-container">
                    <h2>Error al cargar el empleado</h2>
                    <p>{error || "Empleado no encontrado"}</p>
                    <button onClick={rechargeEmployee} className="btn-retry">Reintentar</button>
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
                            <span className="detail-label">Sueldo por hora:</span>
                            <span className="detail-value">
                                {loadingSalary && "Cargando..."}
                                {!loadingSalary && SalaryError && "Error"}
                                {!loadingSalary && !SalaryError && salary !== null && `$${salary}`}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Cédula:</span>
                            <span className="detail-value">{cedula}</span>
                        </div>
                    </div>
                </div>

                {/* Reporte de desempeño */}
                <div className="section report-section">
                    <h2 className="section-title">Reporte de desempeño</h2>
                    <div className="report-controls">
                        <div className="date-inputs">
                            <div className="form-field" style={{width: '100%'}}> 
                                <label className="input-label">Seleccionar Mes del Reporte</label>
                                {/* INPUT MODIFICADO: Solo Fecha Inicio */}
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="date-input"
                                />
                                <small style={{color: '#666', marginTop: '5px', display: 'block'}}>
                                    Se generará el reporte usando la cédula: <strong>{cedula}</strong>
                                </small>
                            </div>
                        </div>
                        <button 
                            className="btn-generate-report"
                            onClick={handleGenerateReport}
                            disabled={!startDate || loadingReporte}
                        >
                            {loadingReporte ? 'Generando...' : 'Generar reporte'}
                        </button>
                    </div>
                </div>

                {/* Acción principal Horario */}
                <div className="actions-section">
                    <button className="btn-manage-schedule" onClick={openCreateModal}>
                        Gestionar horario
                    </button>
                </div>
            </div>

            {/* MODAL 1: Crear Horario */}
            <Modal
                open={isCreateModalOpen}
                onClose={closeCreateModal}
                title="Asignar Horario"
            >
                <ScheduleForm
                    hookForm={hookForm}
                    onSubmit={handleCreateSchedule}
                    loading={loadingCreateSchedule}
                    onCancel={closeCreateModal}
                />
            </Modal>

            {/* MODAL 2: Ver Reporte (NUEVO) */}
            <Modal
                open={isReportModalOpen}
                onClose={closeReportModal}
                title="Reporte Mensual"
            >
                {loadingReporte && <div className="p-4 text-center"><Loading /> Generando visualización...</div>}
                
                {!loadingReporte && reporte && (
                    <EmployeeReportViewer data={reporte} />
                )}

                {!loadingReporte && !reporte && (
                    <div className="p-4 text-center text-gray-500">
                        No se pudo cargar la información del reporte.
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default ViewEmployeePage;