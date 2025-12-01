import { useCallback, useState } from "react";
import { GetEmployeeSalary } from "./employees.request";

interface ReturnUseSalaryEmployee {
    salary: number | null;
    loadingSalary: boolean;
    SalaryError: string | null;
    refetchSalary: (cedula: string ) => Promise<void>
}

export const useSalaryEmployee = (cedula: string): ReturnUseSalaryEmployee => {
    const [loadingSalary, setLoadingSalary] = useState(false);
    const [salary, setSalary] = useState<number | null>(null);
    const [SalaryError, setError] = useState<string | null>(null);

    const getSalary = useCallback(async(cedula: string) => {
        setLoadingSalary(true);
        setError(null);

        try {
            const result = await GetEmployeeSalary(cedula.trim());
            setSalary(result);
        } catch (error: any) {
            setSalary(null);
            setError(error.message);
        } finally {
            setLoadingSalary(false);
        }
    }, []);

    const refetchSalary = async (cedula: string) => {
        await getSalary(cedula);
    }

    return {
        salary,
        loadingSalary,
        SalaryError,
        refetchSalary
    };
};
