import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalesService } from '../services/hospitales.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Hospital } from '../models/hospital';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospitales-editar',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatSnackBarModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatInputModule],
  templateUrl: './hospitales-editar.component.html',
  styleUrls: ['./hospitales-editar.component.scss'] // Cambiado styleUrl a styleUrls
})
export class HospitalesEditarComponent implements OnInit {
  hospitalForm: FormGroup;
  hospital: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hospitalesService: HospitalesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.hospitalForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.hospitalesService.getHospital(id).subscribe(hospital => {
        this.hospital = hospital;
        this.hospitalForm.patchValue({
          id: hospital.id,
          nombre: hospital.nombre,
          direccion: hospital.direccion
        });
      });
    }
  }

  onSubmit(): void {
    if (this.hospitalForm.valid) {
      const updatedHospital: Hospital = this.hospitalForm.value;
      this.hospitalesService.update(updatedHospital).subscribe({
        next: () => {
          this.snackBar.open('Hospital actualizado exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/hospitales']);
        },
        error: (error) => {
          console.error('Error al actualizar el hospital', error);
          this.snackBar.open('Error al actualizar el hospital', 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/hospitales']);
  }
}