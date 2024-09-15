import { RoleEnum } from "./user";

export interface RegisterRequest { 
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string
}
