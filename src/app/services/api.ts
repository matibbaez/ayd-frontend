import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 

export interface Cliente {
  id: number;
  nombre_completo: string;
  email: string;
  // 👇 AGREGAMOS ESTOS DOS PARA QUE NO DE ERROR EL HTML
  dni_cuit?: string;
  telefono?: string;
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
  
  // 👇 MANTENGO LA URL LOCAL ACTIVADA PARA QUE SIGAS PROBANDO
  private apiUrl = 'http://localhost:3000'; 
  
  // ⚠️ ACORDATE: Cuando termines de probar, comentá la de arriba y descomentá esta:
  // private apiUrl = environment.apiUrl; 

  createCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clientes`, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  }

  getCausas(): Observable<Causa[]> {
    return this.http.get<Causa[]>(`${this.apiUrl}/causas`);
  }

  createCausa(causa: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/causas`, causa);
  }
}