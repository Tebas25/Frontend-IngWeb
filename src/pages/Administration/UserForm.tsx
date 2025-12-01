import type { UseFormReturn } from "react-hook-form";
import type { NewUser } from "../../hooks/admin/admin";
import Loading from "../../components/Loading.component";

interface UserFormProps {
  hookForm: UseFormReturn<NewUser>
  onSubmit: () => void;
  loading: boolean;
  onCancel: () => void;
}

export const UserForm = ({ hookForm, onSubmit, loading }: UserFormProps) => {
  const { register, handleSubmit, formState: { errors } } = hookForm;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-form">
      <div className="form-grid">
        <div className="form-field">
          <label>Nombre de usuario *</label>
          <input
            type="text"
            {...register('username',{ 
              required: 'El usuario es requerido'
            })}
            placeholder="Ingrese el nombre de usuario"
          />
          {errors.username && <span className="error">{errors.username.message}</span>}
        </div>

        <div className="form-field">
          <label>Correo electrónico *</label>
          <input
            type="text"
            {...register('email',{ 
              required: 'El correo es requerido'
            })}
            placeholder="Ingrese el correo electrónico"
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-field">
          <label>Contraseña *</label>
          <input
            type="text"
            {...register('password',{ 
              required: 'La contraseña es requerida'
            })}
            placeholder="Ingrese la contraseña"
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <div className="form-actions">
          <button type="button" disabled={loading} className="btn-submit">
            Cancelar
          </button>
          <button type="submit" disabled={loading}>
            {loading ? <Loading size="small" /> : 'Crear Usuario'}
          </button>
        </div>
      </div>
    </form>
  )
}
