import type { UseFormReturn } from 'react-hook-form';
import type { NewEmployee } from '../../hooks/admin/admin';

interface EmployeeFormProps {
    hookForm: UseFormReturn<NewEmployee>;
    onSubmit: () => void;
    loading: boolean;
    onCancel: () => void;
}

export const EmployeeForm = ({ hookForm, onSubmit, loading, onCancel }: EmployeeFormProps) => {
    const { register, handleSubmit, formState: { errors } } = hookForm;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="employee-form">
            <div className="form-grid">
                <div className="form-field">
                    <label>Nombre *</label>
                    <input
                        type="text"
                        {...register('Nombre', { 
                            required: 'El nombre es requerido',
                            minLength: {
                                value: 2,
                                message: 'Mínimo 2 caracteres'
                            }
                        })}
                        placeholder="Ingrese el nombre"
                    />
                    {errors.Nombre && <span className="error">{errors.Nombre.message}</span>}
                </div>

                <div className="form-field">
                    <label>Apellido *</label>
                    <input
                        type="text"
                        {...register('Apellido', { 
                            required: 'El apellido es requerido',
                            minLength: {
                                value: 2,
                                message: 'Mínimo 2 caracteres'
                            }
                        })}
                        placeholder="Ingrese el apellido"
                    />
                    {errors.Apellido && <span className="error">{errors.Apellido.message}</span>}
                </div>

                <div className="form-field">
                    <label>Cédula *</label>
                    <input
                        type="text"
                        {...register('Cedula', { 
                            required: 'La cédula es requerida',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Solo números'
                            }
                        })}
                        placeholder="Ingrese la cédula"
                    />
                    {errors.Cedula && <span className="error">{errors.Cedula.message}</span>}
                </div>

                <div className="form-field">
                    <label>Área *</label>
                    <select 
                        {...register('Area', {required: 'El área es requerida'})}
                    >
                        <option value="Foods">Foods</option>
                        <option value="House keeping">House keeping</option>
                        <option value="Rides">Rides</option>
                        <option value="Maintainance">Maintainance</option>
                        <option value="Lifeguard">Lifeguard</option>
                        <option value="Games">Games</option>
                    </select>
                </div>

                <div className="form-field full-width">
                    <label>Cargo *</label>
                    <select 
                        {...register('Cargo', {required: 'El cargo es requerido'})}
                    >
                        <option value="Manager">Manager</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Staff">Staff</option>
                        <option value="Area Supervisor">Area Supervisor</option>
                    </select>
                </div>
            </div>

            <div className="form-actions">
                <button type="button" onClick={onCancel} disabled={loading}>
                    Cancelar
                </button>
                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Empleado'}
                </button>
            </div>
        </form>
    );
};