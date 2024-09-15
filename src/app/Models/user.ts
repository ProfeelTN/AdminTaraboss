import { Skills } from './Skills';
import { Token } from './token';


export interface User { 
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    role?: string;
    token?: Token;
    skills?:Skills[]
    createdAt?:string

}

    export type RoleEnum = 'ADMIN' | 'ETUDIANT'|'ENTREPRISE'|'ENCADRANT';
    export const RoleEnum = {
        Admin: 'ADMIN' as RoleEnum,
        Etudiant: 'ETUDIANT' as RoleEnum,
        Entreprise: 'ENTREPRISE' as RoleEnum,
        Encadrant: 'ENCADRANT' as RoleEnum
    };