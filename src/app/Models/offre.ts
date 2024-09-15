// src/app/models/offre.ts

import { Candidature } from "./candidature";
import { Type } from "./Type";

  
  export interface Offre {
    id?:number;
    title?: string;
    company?: string;
    duration?: number;
    location?: string;
    description?: string;
    keywords?:string
    type?: Type;
    createdAt?: string;
    candidatureCount: number; // Add this field
  }
  