import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Experience } from 'src/app/Models/Experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService implements OnInit {

  private readonly apiUrl : string = "http://localhost:8075/taraboss/experience"

  constructor(private router: Router,
    private http : HttpClient
    ) { }
  ngOnInit(): void {
    this.getCurrentUserExperience();
  }

  getCurrentUserExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/me`);
  }

  createUserExperience(experience: Experience): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, experience);
  }

  deleteUserExperience(educationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${educationId}`);
  }

  getExperienceByUserId(id: string): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/${id}`);
  }
  
  }
