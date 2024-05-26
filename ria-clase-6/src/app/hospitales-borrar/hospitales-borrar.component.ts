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
  selector: 'app-hospitales-borrar',
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
  templateUrl: './hospitales-borrar.component.html',
  styleUrls: ['./hospitales-borrar.component.scss']
})
export class HospitalesBorrarComponent implements OnInit {
  public hospital: Hospital | undefined;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private hospitalesService: HospitalesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const hospitalId = this.route.snapshot.paramMap.get('id');
    if (hospitalId) {
      this.hospitalesService.getHospital(hospitalId).subscribe({
        next: (data) => {
          this.hospital = data;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  borrarHospital(): void {
    if (this.hospital) {
      this.hospitalesService.delete(this.hospital.id.toString()).subscribe({
        next: () => {
          this.snackBar.open('Hospital eliminado exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.router.navigate(['/hospitales']);
        },
        error: (error) => {
          console.error('Error al eliminar el hospital', error);
        }
      });
    }
  }
  cancelar(): void {
    this.router.navigate(['/hospitales']);
  }
}
