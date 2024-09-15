import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Education } from 'src/app/Models/Education';

@Injectable({
  providedIn: 'root'
})
export class EducationService implements OnInit {

  private readonly apiUrl : string = "http://localhost:8075/taraboss/education"

  constructor(private router: Router,
    private http : HttpClient
    ) { }
  ngOnInit(): void {
    this.getCurrentUserEducation();
  }

  getCurrentUserEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiUrl}/me`);
  }

  createUserEducation(education: Education): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, education);
  }

  updateUserEducation(education: Education): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, education);
  }

  deleteUserEducation(educationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${educationId}`);
  }

  getEducationByUserId(id: string): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiUrl}/${id}`);
  }
  
  }
