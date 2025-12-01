import { useForm, type UseFormReturn } from "react-hook-form";
import type { AssingSchedule } from "./schedule";
import { useMutation } from "@tanstack/react-query";
import { assingSchedule } from "./seasons.request";
import { toast } from "react-toastify";

interface ICreateNewScheduleReturn {
    hookForm: UseFormReturn<AssingSchedule>;
    handleCreateSchedule: () => Promise<void>;
    loadingCreateSchedule: boolean;
}

const defaultFormValues: AssingSchedule = {
    Fecha_inicio: "",
    Fecha_final: "",
    Cedula_empleado: "",
    Horas_lunes: 0,
    Horas_martes: 0,
    Horas_miercoles: 0,
    Horas_jueves: 0,
    Horas_viernes: 0
}

export const useCreateSchedule = (): ICreateNewScheduleReturn => {
    const hookForm = useForm<AssingSchedule>({ defaultValues: defaultFormValues})
    const { mutateAsync: createScheduleMutate, isPending: loadingCreateSchedule } = useMutation({
        mutationFn: assingSchedule,
        onSuccess: () => {
            toast.success("Horario asignado exitosamente");
            hookForm.reset(defaultFormValues)
        },
        onError: () => {
            toast.error("Error al asignar el horario al empleado")
        }
    })

    const handleCreateSchedule = hookForm.handleSubmit(async(formData: AssingSchedule) => {
        const payload = {
        ...formData,
        Cedula_empleado: String(formData.Cedula_empleado).trim(),
        Fecha_inicio: new Date(formData.Fecha_inicio).toISOString().split('T')[0],
        Fecha_final: new Date(formData.Fecha_final).toISOString().split('T')[0]
    };
        await createScheduleMutate(payload)
    })

    return {
        handleCreateSchedule,
        hookForm,
        loadingCreateSchedule
    }
}