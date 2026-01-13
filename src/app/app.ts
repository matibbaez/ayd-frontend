import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ApiService, Causa } from './services/api'; // <--- Importá Causa

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss' // O .scss si elegiste eso
})
export class AppComponent implements OnInit {
  private apiService = inject(ApiService);
  
  // Variables para guardar los datos
  causas: Causa[] = [];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // Pedimos las causas al Backend
    this.apiService.getCausas().subscribe({
      next: (data) => {
        console.log('Causas recibidas:', data);
        this.causas = data;
      },
      error: (e) => console.error('Error al traer causas:', e)
    });
  }
}