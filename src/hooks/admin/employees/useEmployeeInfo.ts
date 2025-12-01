// useEmployee.ts
import { useState, useEffect, useCallback } from "react";
import type { Employee } from "../admin";
import { fetchEmployeeByCedula } from "./employees.request";

interface UseEmployeeReturn {
    employee: Employee | null;
    loadingEmployee: boolean;
    error: string | null;
    rechargeEmployee: () => Promise<void>;
}

export const useEmployee = (cedula?: string): UseEmployeeReturn => {
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loadingEmployee, setLoadingEmployee] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getEmployee = useCallback(async (employeeCedula: string) => {
        
        if (!employeeCedula.trim()) {
            setEmployee(null);
            setError("La cédula no puede estar vacía");
            return;
        }

        setLoadingEmployee(true);
        setError(null);
        
        try {
            const result = await fetchEmployeeByCedula(employeeCedula.trim());
            setEmployee(result);
            
            if (!result) {
                setError("No se encontró ningún empleado con esa cédula");
            }
        } catch (err: any) {
            setEmployee(null);
            setError(err.message || "Error al buscar empleado");
        } finally {
            setLoadingEmployee(false);
        }
    }, []);

    const rechargeEmployee = useCallback(async () => {
        if (cedula) {
            await getEmployee(cedula);
        }
    }, [cedula, getEmployee]);

    useEffect(() => {
        if (cedula) {
            getEmployee(cedula);
        }
    }, [cedula, getEmployee]);

    return {
        employee,
        loadingEmployee,
        error,
        rechargeEmployee,
    };
};