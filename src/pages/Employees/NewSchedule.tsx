import { Controller, type UseFormReturn } from "react-hook-form";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import type { AssingSchedule } from "../../hooks/admin/seasonsAndSchedule/schedule";

interface ScheduleFormProps {
    hookForm: UseFormReturn<AssingSchedule>;
    onSubmit: () => void; // Corregido el typo onSumbmit
    loading: boolean;
    onCancel: () => void;
}

export const ScheduleForm = ({ hookForm, onSubmit, loading, onCancel }: ScheduleFormProps) => {
    const { control, formState: { errors } } = hookForm;

    // Helper para mostrar mensajes de error
    const getFormErrorMessage = (name: keyof AssingSchedule) => {
        return errors[name] ? <small className="p-error text-red-500 block mt-1">{errors[name]?.message}</small> : null;
    };

    return (
        <form onSubmit={onSubmit} className="p-fluid grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* --- SECCIÓN: DATOS GENERALES --- */}
            <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-semibold mb-2 border-b pb-1">Datos del Empleado</h3>
            </div>

            {/* Cédula del Empleado */}
            <div className="field col-span-1 md:col-span-2">
                <label htmlFor="Cedula_empleado" className="font-medium">Cédula del Empleado</label>
                <Controller
                    name="Cedula_empleado"
                    control={control}
                    rules={{ required: 'La cédula es obligatoria' }}
                    render={({ field, fieldState }) => (
                        <InputText 
                            id={field.name} 
                            {...field} 
                            className={classNames({ 'p-invalid': fieldState.invalid })} 
                            placeholder="Ingrese la cédula"
                        />
                    )}
                />
                {getFormErrorMessage('Cedula_empleado')}
            </div>

            {/* Fecha Inicio */}
            <div className="field">
                <label htmlFor="Fecha_inicio" className="font-medium">Fecha Inicio</label>
                <Controller
                    name="Fecha_inicio"
                    control={control}
                    rules={{ required: 'La fecha de inicio es requerida' }}
                    render={({ field }) => (
                        <Calendar 
                            id={field.name} 
                            value={field.value ? new Date(field.value) : null} 
                            onChange={(e) => field.onChange(e.value)} 
                            dateFormat="yy-mm-dd"
                            showIcon 
                            placeholder="Selecciona fecha inicio"
                        />
                    )}
                />
                {getFormErrorMessage('Fecha_inicio')}
            </div>

            {/* Fecha Final */}
            <div className="field">
                <label htmlFor="Fecha_final" className="font-medium">Fecha Final</label>
                <Controller
                    name="Fecha_final"
                    control={control}
                    rules={{ required: 'La fecha final es requerida' }}
                    render={({ field }) => (
                        <Calendar 
                            id={field.name} 
                            value={field.value ? new Date(field.value) : null} 
                            onChange={(e) => field.onChange(e.value)} 
                            dateFormat="yy-mm-dd"
                            showIcon 
                            placeholder="Selecciona fecha fin"
                        />
                    )}
                />
                {getFormErrorMessage('Fecha_final')}
            </div>

            {/* --- SECCIÓN: HORAS DIARIAS --- */}
            <div className="col-span-1 md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold mb-2 border-b pb-1">Horario Semanal (Horas)</h3>
            </div>

            {/* Iteramos para crear los inputs de Lunes a Viernes */}
            {['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].map((dia) => {
                const fieldName = `Horas_${dia}` as keyof AssingSchedule;
                return (
                    <div key={dia} className="field">
                        <label htmlFor={fieldName} className="capitalize font-medium">{dia}</label>
                        <Controller
                            name={fieldName}
                            control={control}
                            rules={{ required: true, min: 0, max: 24 }}
                            render={({ field }) => (
                                <InputNumber 
                                    id={field.name} 
                                    value={field.value as number} 
                                    onValueChange={(e) => field.onChange(e.value)} 
                                    mode="decimal" 
                                    showButtons 
                                    min={0} 
                                    max={24}
                                    suffix=" hrs"
                                />
                            )}
                        />
                        {getFormErrorMessage(fieldName)}
                    </div>
                );
            })}

            {/* --- BOTONES DE ACCIÓN --- */}
            <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-6 border-t pt-4">
                <Button 
                    label="Cancelar" 
                    icon="pi pi-times" 
                    type="button" 
                    onClick={onCancel} 
                    className="p-button-text p-button-secondary" 
                />
                <Button 
                    label="Guardar Horario" 
                    icon="pi pi-check" 
                    type="submit" 
                    loading={loading} 
                    disabled={loading}
                />
            </div>
        </form>
    );
};