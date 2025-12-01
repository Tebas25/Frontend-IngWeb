import { useForm, type UseFormReturn } from "react-hook-form";
import type { Season } from "../admin";
import { useMutation } from "@tanstack/react-query";
import { createSeason } from "./seasons.request";
import { toast } from "react-toastify";

interface ICreateSeasonReturn {
    hookForm: UseFormReturn<Season>;
    handleCreateSeason: () => Promise<void>;
    loadingCreateSeason: boolean;
}

const defaultFormValues: Season = {
    nombre: "",
    fecha_inicio: "",
    fecha_final: "",
    multiplicador: 1
}

export const useCreateSeason = (): ICreateSeasonReturn => {
    const hookForm = useForm<Season>({ defaultValues: defaultFormValues});

    const {mutateAsync: createSeasonMutate, isPending: loadingCreateSeason} = useMutation({
        mutationFn: createSeason,
        onSuccess: () => {
            toast.success("Temporada creada exitosamente");
            hookForm.reset(defaultFormValues);
        },
        onError: () => {
            toast.error(`Error al crear temporada`);
        }
    });

    const handleCreateSeason = hookForm.handleSubmit(async(formData: Season ) => {
        await createSeasonMutate(formData);
    })

    return {
        hookForm,
        handleCreateSeason,
        loadingCreateSeason,
    }
}