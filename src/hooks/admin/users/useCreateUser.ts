import { useForm, type UseFormReturn } from "react-hook-form";
import type { NewUser } from "../admin";
import { createUser } from "./User.request";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

interface ICreateUserReturn {
  hookForm: UseFormReturn<NewUser>;
  handleCreateUser: () => Promise<void>
  loadingCreateUser: boolean;
}

const defaultFormValues: NewUser = {
  username: "",
  email: "",
  password: ""
}

export const createNewUser = (): ICreateUserReturn => {
  const hookForm = useForm<NewUser>({ defaultValues: defaultFormValues})

  const { mutateAsync: createUserMutate, isPending: loadingCreateUser } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Usuario creado exitosamente");
      hookForm.reset(defaultFormValues);
    },
    onError: (error: any) => {
      toast.error(`Error al crear usuario: ${error.message}`);
    }
  });

  const handleCreateUser = hookForm.handleSubmit(async (formData: NewUser) => {
    await createUserMutate(formData);
  })

  return {
    hookForm,
    handleCreateUser,
    loadingCreateUser
  }
}