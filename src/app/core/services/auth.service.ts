import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap, of } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from "src/app/Models/user";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private User :any;
    //private readonly baseUrl:string=environment.url+"user/"
    private readonly baseUrl:string="http://localhost:8075/taraboss"
  
    token:string = ''; // Assign an initial value of an empty string to the 'token' property.
    public loggedUser:string = ''; // Assign an initial value of an empty string to the 'loggedUser' property.
    public isloggedIn: Boolean = false;
    public roles: string[] = [];
    private helper = new JwtHelperService();
  
    constructor(private router: Router,
      private httpClient : HttpClient
      ) { }
  
    public login(user : User){
      return this.httpClient.post(this.baseUrl+"/api/v1/auth/authenticate",user,{observe:'response'});
    }
    public registerStagaire(user : User){
      return this.httpClient.post(this.baseUrl+"/api/v1/auth/registerStagaire",user,{observe:'response'});
      }
    
    public registerEncadrant(user : User){
      return this.httpClient.post(this.baseUrl+"/api/v1/auth/registerEncadrant",user,{observe:'response'});
      }
  
    saveToken(token:string){
      localStorage.setItem('token',token);
      this.token = token;
      this.isloggedIn = true; 
      this.decodeJWT(); 
    }
    
    decodeJWT()
    {   if (this.token == undefined)
              return;
      const decodedToken = this.helper.decodeToken(this.token);
      this.roles = decodedToken.roles;
      this.loggedUser = decodedToken.sub;
    }
  
    logout() {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
  }

  getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:8075/taraboss/user/get-all");
  }
  
  
  
    public forgetPassword(email:string){
      const body ={email : email}
      return this.httpClient.post(this.baseUrl+"/user/forgetPassword",body);
    }
  
    public resetPassword(data :any){
      return this.httpClient.post(this.baseUrl+"/user/resetPassword",data);
    }
  
  
    isTokenExpired(): Boolean
    {
      return  this.helper.isTokenExpired(this.token);
    }
  
    setLoggedUserFromLocalStorage(login : string) {
      this.loggedUser = login;
      this.isloggedIn = true;
      this.getUserRoles(login);
    }
  
    getUserRoles(login :string){    
      
    }

    getUserID(){
      return this.httpClient.get(`${this.baseUrl}/user/Id`);
    }

    
  
    public retrieveUserConnected(token: string): Observable<any> {
      // const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.httpClient.get(`${this.baseUrl}/user/currentUser`);
    }
    isAuthenticated(): Observable<boolean> {
      const token = localStorage.getItem('token');
      return of(token !== null); // Renvoie true si un jeton est présent, sinon false
    } 
  
  
    public getCurrentUser(): Observable<User> {
      // Get the token from local storage
      const token = localStorage.getItem('token');
    
      // Prepare the headers with Authorization token
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
      // Make the HTTP GET request to retrieve the current user
      return this.httpClient.get<User>(`${this.baseUrl}/user/currentUser`, { headers });
    }
    
    public retrieveUser(email: any) {
      const tokenUser = this.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenUser}`);
      return this.httpClient.get(`${this.baseUrl}/RetrieveUser/${email}`, { headers });
    }
  
    public retrieveUsers() : Observable<User[]> {
      return this.httpClient.get<User[]>(this.baseUrl+"/user/get-all");
    }
  
  
    public deleteUser(id: number) {
      return this.httpClient.delete(`${this.baseUrl}/user/delete/${id}`);
    }
  
    public roleMatch(allowedRoles :any): boolean {
      let isMatch = false;
      const userRole = this.getRole() as string;
      if (userRole != null) {
        for (let i = 0; i < allowedRoles.length; i++) {
          if (allowedRoles[i] == userRole ) {
            isMatch = true;
            return isMatch;
          }
        }
        return isMatch;
      }
      return isMatch;
    }
  
    public setRole(role : string) {
      localStorage.setItem('role',role);
    }
  
    public getRole(): string {
      return JSON.parse(JSON.stringify(localStorage.getItem('role')));
    }
  
    public setToken(jwtToken: string) {
      localStorage.setItem('token', jwtToken);
    }
  
    getToken(): string | null {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      return token;
    }
  
    public clear() {
      localStorage.clear();
    }
  
    public  isLoggedIn() : Observable <boolean> {
      return new Observable<boolean>(observer => { 
        this.isLoggedIn().subscribe((res: any) => { 
          if (res.status == 200) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        });
      });
    }
}