// components/employee/DeleteEmployeeForm.tsx
import { useState, useEffect } from 'react';
import { useEmployeeByCedula } from '../../hooks/admin/employees/useEmployeeByCedula';
import Loading from '../../components/Loading.component';

interface DeleteEmployeeFormProps {
  onDelete: (cedula: string) => Promise<boolean>;
  loading: boolean;
  onCancel: () => void;
}

export const DeleteEmployeeForm = ({ 
  onDelete, 
  loading, 
  onCancel 
}: DeleteEmployeeFormProps) => {
  const [cedula, setCedula] = useState<string>('');
  const [searchedCedula, setSearchedCedula] = useState<string>('');
  const { employee, loadingEmployee, error, refetchEmployee, clearEmployee } = useEmployeeByCedula();

  // Limpiar la búsqueda cuando se cierra el modal
  useEffect(() => {
    return () => {
      clearEmployee();
    };
  }, [clearEmployee]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cedula.trim()) {
      alert('Por favor ingrese una cédula para buscar');
      return;
    }

    setSearchedCedula(cedula.trim());
    await refetchEmployee(cedula.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cedula.trim()) {
      alert('Por favor ingrese una cédula');
      return;
    }

    if (!employee) {
      alert('Por favor busque y verifique el empleado antes de eliminar');
      return;
    }

    const success = await onDelete(cedula.trim());
    if (success) {
      setCedula('');
      setSearchedCedula('');
      clearEmployee();
    }
  };

  const handleCancel = () => {
    setCedula('');
    setSearchedCedula('');
    clearEmployee();
    onCancel();
  };

  const handleCedulaChange = (value: string) => {
    setCedula(value);
    if (value !== searchedCedula) {
      clearEmployee();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-field full-width">
        <label>Cédula del Empleado a Eliminar *</label>
        <div className="search-container">
          <input
            type="text"
            value={cedula}
            onChange={(e) => handleCedulaChange(e.target.value)}
            placeholder="Ingrese la cédula del empleado"
            disabled={loading}
            className={loading ? 'disabled-input' : ''}
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={loading || loadingEmployee || !cedula.trim()}
            className="btn-search"
          >
            {loadingEmployee ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        <p className="form-help">
          Ingrese la cédula y presione "Buscar" para verificar el empleado antes de eliminar.
        </p>
      </div>

      {/* Tabla de información del empleado */}
      {loadingEmployee && (
        <Loading size="small" />
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {employee && !loadingEmployee && (
        <div className="employee-preview">
          <h4>Empleado encontrado:</h4>
          <div className="preview-table">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Cédula</th>
                  <th>Área</th>
                  <th>Cargo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{employee.Empleado_id}</td>
                  <td>{employee.Nombre}</td>
                  <td>{employee.Apellido}</td>
                  <td>{employee.Cedula}</td>
                  <td>{employee.Area}</td>
                  <td>{employee.Cargo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="form-actions">
        <button 
          type="button" 
          onClick={handleCancel} 
          disabled={loading}
          className="btn-cancel"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          disabled={loading || !cedula.trim() || !employee}
          className="btn-delete"
        >
          {loading ? 'Eliminando...' : 'Eliminar Empleado'}
        </button>
      </div>
    </form>
  );
};