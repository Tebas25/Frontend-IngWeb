import axios from "axios";
import type { Employee, NewEmployee } from "../admin";

const API_BASE = "http://localhost:8000/admin/empleados";

export const createEmployee = async (employee: NewEmployee) => {
    const response = await axios.post(`${API_BASE}/ingresar-empleado`, employee);
    return response.data;
}

export const fetchGetAllEmployees = async (): Promise<Employee[]> => {
    try {
        const url = `${API_BASE}/obtener-empleados`;
        const { data } = await axios.get(url);
        
        if (data && data.data) {
            return data.data;
        } else if (Array.isArray(data)) {
            return data;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

export const deleteEmployee = async (cedula: string): Promise<boolean> => {
    try {
        const url = `${API_BASE}/eliminar-empleados`;
        const response = await axios.post(url, null, {
            params: { cedula }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
}

export const fetchEmployeeByCedula = async (cedula: string): Promise<Employee | null> => {
    try {
        const url = `${API_BASE}/obtener-empleado`;
        const { data } = await axios.post(url, null, {
            params: { cedula }
        });
        return data || null;
    } catch (error: any) {
        if (error.response?.status === 404) {
            return null;
        }
        throw new Error(error.response?.data?.message || error.message || "Error al buscar empleado");
    }
}

export const GetEmployeeSalary = async (cedula: string): Promise<number> => {
    try{
        const url = `${API_BASE}/obtener-salario`;
        const { data } = await axios.post(url, null, {
            params: { cedula }
        });
        return data.salario|| null;
    } catch (error: any) {
        throw new Error(error.response?.daya.message || error.message)
    }
} 