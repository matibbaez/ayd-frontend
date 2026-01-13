import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // <--- 1. IMPORTAR ESTO

export interface Cliente {
  id: number;
  nombre_completo: string;
  email: string;
}

export interface Causa {
  id: number;
  caratula: string;
  nro_expediente: string;
  juzgado: string;
  estado: string;
  cliente?: Cliente;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  
  private apiUrl = environment.apiUrl; 

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }

  getCausas(): Observable<Causa[]> {
    return this.http.get<Causa[]>(`${this.apiUrl}/causas`);
  }
}