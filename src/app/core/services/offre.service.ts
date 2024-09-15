import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Offre } from 'src/app/Models/offre';

@Injectable({
  providedIn: 'root'
})
export class OffreService implements OnInit {

  private readonly apiUrl : string = "http://localhost:8075/taraboss/offre"

  constructor(private router: Router,
    private http : HttpClient
    ) { }
  ngOnInit(): void {
  }

  createOffre(offre:Offre): Observable<any> {
    return this.http.post<Offre>(this.apiUrl, offre);
  }

  getOffre(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.apiUrl}/${id}`);
  }

  getTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/type`);
  }

  getAllOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.apiUrl);
  }

  updateOffre(id: number, offre: Offre): Observable<Offre> {
    return this.http.put<Offre>(`${this.apiUrl}/${id}`, offre);
  }

  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  getKeywordsByOffreId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/keywords`);
  }



  }
