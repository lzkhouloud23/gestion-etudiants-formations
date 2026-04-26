import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:3001/api';

  constructor(private http: HttpClient) { }

  // ===== ÉTUDIANTS =====
  getEtudiants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/etudiants`);
  }

  getEtudiantById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/etudiants/${id}`);
  }

  addEtudiant(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/etudiants`, data);
  }

  updateEtudiant(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/etudiants/${id}`, data);
  }

  deleteEtudiant(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/etudiants/${id}`);
  }

  // ===== FORMATIONS =====
  getFormations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/formations`);
  }

  getFormationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/formations/${id}`);
  }

  addFormation(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/formations`, data);
  }

  updateFormation(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/formations/${id}`, data);
  }

  deleteFormation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/formations/${id}`);
  }
}