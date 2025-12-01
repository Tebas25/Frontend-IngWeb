export interface NewEmployee {
    Nombre: string;
    Apellido: string;
    Cedula: string;
    Area: string;
    Cargo: string;
}

export interface Employee {
    Empleado_id: number;
    Nombre: string;
    Apellido: string;
    Cedula: string;
    Area: string;
    Cargo: string;
}

export interface ReturnSeasons {
    Nombre: string;
    Fecha_inicio: string;
    Fecha_fin: string;
    Multiplicador: number;
}

export interface Season {
    nombre: string;
    fecha_inicio: string;
    fecha_final: string;
    multiplicador: number;
}

export interface NewUser {
    username: string;
    email: string;
    password: string;
}