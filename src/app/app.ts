import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ApiService, Causa, Cliente } from './services/api'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss' // O .scss si elegiste eso
})
export class AppComponent implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  cargando = false;
  
  // Variables para guardar los datos
  clientes: Cliente[] = []; // (Si querés mostrar la lista de clientes también)
  causas: Causa[] = [];

  clienteForm: FormGroup = this.fb.group({
    nombre_completo: ['', Validators.required], 
    email: ['', [Validators.required, Validators.email]], 
    telefono: [''],
    dni_cuit: ['']
  });

  causaForm: FormGroup = this.fb.group({
    caratula: ['', Validators.required],
    nro_expediente: [''],
    juzgado: [''],
    cliente_id: ['', Validators.required] 
  });

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    // 1. Pedimos los CLIENTES (¡Esto faltaba!)
    this.apiService.getClientes().subscribe({
      next: (data) => {
        console.log('Clientes recibidos:', data);
        this.clientes = data;
      },
      error: (e) => console.error('Error al traer clientes:', e)
    });

    // 2. Pedimos las CAUSAS (Esto ya lo tenías)
    this.apiService.getCausas().subscribe({
      next: (data) => {
        console.log('Causas recibidas:', data);
        this.causas = data;
      },
      error: (e) => console.error('Error al traer causas:', e)
    });
  }

  guardarCliente() {
    if (this.clienteForm.invalid) {
      alert('Por favor completá los datos obligatorios');
      return;
    }

    // 2. Activamos el bloqueo
    this.cargando = true; 
    const datos = this.clienteForm.value;

    this.apiService.createCliente(datos).subscribe({
      next: (resp) => {
        alert('¡Cliente creado con éxito! 🎉');
        this.clienteForm.reset();
        this.cargarDatos();
        
        // 3. Desactivamos el bloqueo al terminar
        this.cargando = false; 
      },
      error: (e) => {
        console.error(e);
        alert('Error al guardar');
        
        // 4. Desactivamos el bloqueo también si falla (muy importante)
        this.cargando = false; 
      }
    });
  }

  guardarCausa() {
    if (this.causaForm.invalid) {
      alert('Falta la carátula o elegir el cliente');
      return;
    }

    this.cargando = true;
    // OJO: Convertimos cliente_id a número por si las dudas (el HTML a veces lo manda como texto)
    const datos = {
      ...this.causaForm.value,
      cliente_id: Number(this.causaForm.value.cliente_id)
    };

    this.apiService.createCausa(datos).subscribe({
      next: () => {
        alert('Expediente creado! ⚖️');
        this.causaForm.reset(); // Limpiamos
        this.cargarDatos(); // Recargamos la tabla
        this.cargando = false;
      },
      error: (e) => {
        console.error(e);
        alert('Error al crear expediente');
        this.cargando = false;
      }
    });
  }
}