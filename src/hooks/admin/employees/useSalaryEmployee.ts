import { useCallback, useEffect, useState } from "react";
import { GetEmployeeSalary } from "./employees.request";

interface ReturnUseSalaryEmployee {
    salary: number | null;
    loadingSalary: boolean;
    SalaryError: string | null;
    refetchSalary: (cedula: string) => Promise<void>
}

export const useSalaryEmployee = (cedula: string): ReturnUseSalaryEmployee => {
    const [loadingSalary, setLoadingSalary] = useState(false);
    const [salary, setSalary] = useState<number | null>(null);
    const [SalaryError, setError] = useState<string | null>(null);

    const getSalary = useCallback(async (targetCedula: string) => {
        setLoadingSalary(true);
        setError(null);

        try {
            const result = await GetEmployeeSalary(targetCedula.trim());
            setSalary(result);
        } catch (error: any) {
            setSalary(null);
            setError(error.message);
        } finally {
            setLoadingSalary(false);
        }
    }, []);

    useEffect(() => {
        if (cedula) {
            getSalary(cedula); 
        }
    }, [cedula, getSalary]);

    const refetchSalary = async (targetCedula: string) => {
        await getSalary(targetCedula);
    }

    return {
        salary,
        loadingSalary,
        SalaryError,
        refetchSalary
    };
};