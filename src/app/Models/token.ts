import { User } from './user';


export interface Token { 
    tokenId?: number;
    token?: string;
    user?: User;
}