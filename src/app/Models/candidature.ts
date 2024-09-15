import { Offre } from "./offre";
import { User } from "./user";


export interface Candidature { 
    id?: number;
    userId?: number
    offreId?:number
    firstName?:string
    lastName?:string
    coverPhotoUrl?:string
    location?:string
    jobTitle?:string
    email?:string
    github?:string
    linkedIn?:string
    phone?:string
    resume?:string
    description?:string
    offreTitle?:string
    statut?:string
    compatibilityScore?: number; // Add this field
    user?:User
    offre?:Offre





}