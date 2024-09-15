import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Skills } from 'src/app/Models/Skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService implements OnInit {

  private readonly apiUrl : string = "http://localhost:8075/taraboss/skills"

  constructor(private router: Router,
    private http : HttpClient
    ) { }
  ngOnInit(): void {
    this.getCurrentUserSkills();
  }
  getCurrentUserSkills(): Observable<Skills[]> {
    return this.http.get<Skills[]>(`${this.apiUrl}/me`);
  }

  createUserSkills(skill: Skills): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, skill);
  }

  deleteUserSkill(skillId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${skillId}`);
  }

  getSkillsByUserId(id: number): Observable<Skills[]> {
    return this.http.get<Skills[]>(`${this.apiUrl}/${id}`);
  }

  }
