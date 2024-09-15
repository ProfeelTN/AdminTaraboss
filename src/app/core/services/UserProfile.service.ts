import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/Models/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService implements OnInit {

  private readonly apiUrl : string = "http://localhost:8075/taraboss/profile"

  constructor(private router: Router,
    private http : HttpClient
    ) { }
  ngOnInit(): void {
  }

  createUserProfile(formData:FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload`,formData);
  }

  getCurrentProfile(): Observable<any> {
    return this.http.get<UserProfile>(`${this.apiUrl}/me`);
  }
  updateUserProfile(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, formData);
  }

  deleteUserProfile(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`);
  }

  getProfileByUserId(userId: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/${userId}`);
  }

  }
