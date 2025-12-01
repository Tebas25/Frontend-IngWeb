import { useEffect, useState } from "react";
import Layout from "../../components/layout.component";
import { useAllSeason } from "../../hooks/admin/seasons/useAllSeasons";
import "../../styles/seasons.css";
import { useCreateSeason } from "../../hooks/admin/seasons/useCreateSeason";
import Modal from "../../components/modal";
import { SeasonForm } from "./NewSeasonPage";
import { UserForm } from "../Administration/UserForm";
import { createNewUser } from "../../hooks/admin/users/useCreateUser"; 

const AdministrationPage = () => {
  const {
    season,
    loadingSeasion,
    selectedSeasons,
    selectAll,
    onSelectionChange,
    onSelectionAllChange,
    refetchSeasons
  } = useAllSeason();

  const { hookForm, handleCreateSeason, loadingCreateSeason } = useCreateSeason();
  const { hookForm: userHookForm, handleCreateUser, loadingCreateUser } = createNewUser();

  useEffect(() => {
    refetchSeasons();
  }, []);

  const formatDateString = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const isSeasonActive = (startDate: string, endDate: string) => {
    const today = new Date().toISOString().split('T')[0]; 
    return startDate <= today && endDate >= today;
  };
  
  // Estados para los modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  // Funciones para el modal de temporadas
  const openCreateSeasonModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    hookForm.reset();
  }

  // Funciones para el modal de usuarios
  const openCreateUserModal = () => setIsCreateUserModalOpen(true);
  const closeCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
    userHookForm.reset();
  }

  const handleCreateSeasonSubmit = async () => {
    await handleCreateSeason();
    closeCreateModal();
    refetchSeasons();
  }

  const handleCreateUserSubmit = async () => {
    await handleCreateUser();
    closeCreateUserModal();
    // Aquí podrías agregar una recarga de usuarios si tienes esa funcionalidad
  }

  return (
    <Layout title="Página de administración">
      <div className="admin-page">
        <header className="admin-header">
          <h1>Administración del Sistema</h1>
          <p>Gestiona temporadas, usuarios y configuraciones del sistema</p>
        </header>

        {/* Panel de Control Principal */}
        <div className="controls-panel">
          <div className="controls-left">
            <h3>Gestión de Temporadas</h3>
            <label className="select-all-label">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => onSelectionAllChange(e.target.checked)}
              />
              <span>Seleccionar todo</span>
            </label>
            {selectedSeasons.length > 0 && (
              <span className="selection-count">
                {selectedSeasons.length} temporada(s) seleccionada(s)
              </span>
            )}
          </div>

          <div className="controls-right">
            <button onClick={openCreateUserModal} className="new-user-btn">
              Nuevo Usuario
            </button>
            <button onClick={openCreateSeasonModal} className="new-season-btn">
              Nueva Temporada
            </button>
          </div>
        </div>

        {/* Sección de Temporadas */}
        <div className="section-container">
          <h2>Temporadas</h2>
          <div className="seasons-table-container">
            {loadingSeasion ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <span>Cargando temporadas...</span>
              </div>
            ) : season.length === 0 ? (
              <div className="empty-state">
                No hay temporadas registradas
              </div>
            ) : (
              <table className="seasons-table">
                <thead>
                  <tr>
                    <th>Seleccionar</th>
                    <th>Nombre</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Multiplicador</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {season.map((seasonItem, index) => (
                    <tr 
                      key={index} 
                      className={selectedSeasons.includes(seasonItem) ? 'selected-row' : ''}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedSeasons.includes(seasonItem)}
                          onChange={(e) => {
                            const newSelection = e.target.checked
                              ? [...selectedSeasons, seasonItem]
                              : selectedSeasons.filter(item => item !== seasonItem);
                            onSelectionChange(newSelection);
                          }}
                        />
                      </td>
                      <td>{seasonItem.Nombre}</td>
                      <td>{formatDateString(seasonItem.Fecha_inicio)}</td>
                      <td>{formatDateString(seasonItem.Fecha_fin)}</td>
                      <td>
                        <span className={`multiplier-badge ${
                          seasonItem.Multiplicador > 1 ? 'high' : 
                          seasonItem.Multiplicador < 1 ? 'low' : 'normal'
                        }`}>
                          {seasonItem.Multiplicador}x
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${
                          isSeasonActive(seasonItem.Fecha_inicio, seasonItem.Fecha_fin) 
                            ? 'active' 
                            : 'inactive'
                        }`}>
                          {isSeasonActive(seasonItem.Fecha_inicio, seasonItem.Fecha_fin) 
                            ? 'Activa' 
                            : 'Inactiva'
                          }
                        </span>
                      </td>
                      <td>
                        <button className="edit-btn">Editar</button>
                        <button className="delete-btn">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="stats-container">
          <div className="stat-card total">
            <h3>Total de Temporadas</h3>
            <p>{season.length}</p>
          </div>
          <div className="stat-card active">
            <h3>Temporadas Activas</h3>
            <p>
              {season.filter(s => 
                isSeasonActive(s.Fecha_inicio, s.Fecha_fin)
              ).length}
            </p>
          </div>
          <div className="stat-card selected">
            <h3>Seleccionadas</h3>
            <p>{selectedSeasons.length}</p>
          </div>
        </div>

        {/* Sección de Gestión de Usuarios */}
        <div className="section-container">
          <h2>Gestión de Usuarios</h2>
          <div className="users-section">
            <div className="users-info">
              <p>Gestiona los usuarios del sistema administrativo</p>
              <button onClick={openCreateUserModal} className="new-user-btn">
                + Crear Nuevo Usuario
              </button>
            </div>
            {/* Aquí podrías agregar una tabla de usuarios si la tienes */}
            <div className="placeholder-section">
              <p>Lista de usuarios aparecerá aquí</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Crear Temporada */}
      <Modal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Crear Nueva Temporada">
            <SeasonForm
                hookForm={hookForm}
                onSubmit={handleCreateSeasonSubmit}
                loading={loadingCreateSeason}
                onCancel={closeCreateModal}
            />
      </Modal>

      {/* Modal para Crear Usuario - NUEVO MODAL */}
      <Modal
        open={isCreateUserModalOpen}
        onClose={closeCreateUserModal}
        title="Crear Nuevo Usuario">
            <UserForm
                hookForm={userHookForm}
                onSubmit={handleCreateUserSubmit}
                loading={loadingCreateUser}
                onCancel={closeCreateUserModal}
            />
      </Modal>
    </Layout>
  );
};

export default AdministrationPage;