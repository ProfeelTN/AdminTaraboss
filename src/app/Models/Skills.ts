import { skillType } from "./SkillType";
import { User } from "./user";

  
  export interface Skills {
    id?: number;
    name?: string;
    proficiency?: string;
    skillType?: skillType;
    user?:User
  }


  