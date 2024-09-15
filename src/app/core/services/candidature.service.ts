import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from './auth.service';
import { Candidature } from 'src/app/Models/candidature';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  private readonly apiUrl : string = "http://localhost:8075/taraboss/candidature"

constructor(private http: HttpClient, private authService: AuthenticationService, private router: Router) { }


    createCandidature(candidature: Candidature): Observable<Candidature> {
      return this.http.post<Candidature>(`${this.apiUrl}/add`, candidature);
    }
  
    getCandidatureById(id: number): Observable<Candidature> {
      return this.http.get<Candidature>(`${this.apiUrl}/${id}`);
    }
  
    getAllCandidatures(): Observable<Candidature[]> {
      return this.http.get<Candidature[]>(this.apiUrl);
    }
  
    updateCandidature(id: number, candidature: Candidature): Observable<Candidature> {
      return this.http.put<Candidature>(`${this.apiUrl}/${id}`, candidature);
    }
  
    deleteCandidature(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    acceptCandidature(candidatureId: number): Observable<any> {
      return this.http.post(`${this.apiUrl}/${candidatureId}/accept`, null)
        .pipe(
          catchError(error => {
            console.error('Error response:', error);
            return throwError(error);
          })
        );
    }
    
    refuseCandidature(candidatureId: number): Observable<any> {
      return this.http.post(`${this.apiUrl}/${candidatureId}/refuse`, null)
        .pipe(
          catchError(error => {
            console.error('Error response:', error);
            return throwError(error);
          })
        );
    }
    
  
  }
