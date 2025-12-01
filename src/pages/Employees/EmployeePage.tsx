// EmployeePage.tsx
import Layout from "../../components/layout.component";
import { useAdmin } from "../../hooks/admin/employees/useAdmin";
import { useAllEmployees } from "../../hooks/admin/employees/useAllEmployees";
import { useDeleteEmployee } from "../../hooks/admin/employees/useDeleteEmployee";
import { useState, type JSX } from "react";
import Modal from "../../components/modal";
import { EmployeeForm } from "./NewEmployee";
import { DeleteEmployeeForm } from "./DeleteEmployeePage";
import "../../styles/employee.css";
import Loading from "../../components/Loading.component";
import { DataTable } from 'primereact/datatable';
import { Column } from "primereact/column";
import { Link } from "react-router-dom";

const EmployeePage = () => {
    const { hookForm, handleCreateEmployee, loadingCreateEmployee } = useAdmin();
    const { 
        employees, 
        loadingEmployees, 
        refetchEmployees
    } = useAllEmployees();
    
    const { handleDeleteEmployee, isDeleting } = useDeleteEmployee();
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        hookForm.reset();
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleCreateSubmit = async () => {
        await handleCreateEmployee();
        closeCreateModal();
        refetchEmployees();
    };

    const handleDeleteSubmit = async (cedula: string) => {
        const success = await handleDeleteEmployee(cedula);
        if (success) {
            closeDeleteModal();
            refetchEmployees();
        }
        return success;
    };

    return (
        <Layout title="Administración de Empleados">
            <div className="employee-header">
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Buscar empleado..." 
                        className="search-input"
                    />
                </div>
                <div className="button-group">
                    <button
                        onClick={openCreateModal}
                        className="btn-new-employee"
                    >
                        + Nuevo Empleado
                    </button>
                    <button
                        onClick={openDeleteModal}
                        className="btn-delete-employee"
                    >
                        🗑️ Eliminar Empleado
                    </button>
                </div>
            </div>

            <div className="employee-content">
            {loadingEmployees ? (
                <div className="loading-container">
                    <Loading size="large"/>
                </div>
            ) : (
                <div className="table-wrapper">
                    <DataTable 
                        value={employees} 
                        emptyMessage="No se encontraron empleados"
                        className="employees-datatable compact-table"
                    >
                        <Column
                            field="Cedula"
                            header="Documento de Identidad"
                            body={({ Empleado_id, Cedula }): JSX.Element => (
                                <Link
                                    to={`/view-employee/${Empleado_id}?cedula=${Cedula}`}
                                    className="text-underline-blue"
                                >
                                    {Cedula}
                                </Link>
                            )}
                        />
                        <Column field="Nombre" header="Nombre" />
                        <Column field="Apellido" header="Apellido" /> 
                        <Column field="Area" header="Área" />
                        <Column field="Cargo" header="Cargo" />
                    </DataTable>
                </div>
            )}
            </div>

            {/* Modal para crear empleado */}
            <Modal
                open={isCreateModalOpen}
                onClose={closeCreateModal}
                title="Nuevo Empleado"
            >
                <EmployeeForm 
                    hookForm={hookForm}
                    onSubmit={handleCreateSubmit}
                    loading={loadingCreateEmployee}
                    onCancel={closeCreateModal}
                />
            </Modal>

            {/* Modal para eliminar empleado */}
            <Modal
                open={isDeleteModalOpen}
                onClose={closeDeleteModal}
                title="Eliminar Empleado"
            >
                <DeleteEmployeeForm 
                    onDelete={handleDeleteSubmit}
                    loading={isDeleting}
                    onCancel={closeDeleteModal}
                />
            </Modal>
        </Layout>
    );
};

export default EmployeePage;