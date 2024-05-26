import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { HospitalesNuevoComponent } from './hospitales-nuevo/hospitales-nuevo.component';
import { HospitalesEditarComponent } from './hospitales-editar/hospitales-editar.component';
import { HospitalesBorrarComponent } from './hospitales-borrar/hospitales-borrar.component';

export const routes: Routes = [
    {
        path: 'test',
        component: TestComponent
    },

    {
        path: '',
        children: [
            { path: 'hospitales', component: HospitalesComponent},
        ]
    },

    {
        path: '',
        children: [
            { path: 'nuevoHospital', component: HospitalesNuevoComponent},
        ]
        
    },

    {
        path: '',
        children: [
            { path: 'editarHospital/:id', component: HospitalesEditarComponent},
        ]
    },

    {
        path: '',
        children: [
            { path: 'borrarHospital/:id', component: HospitalesBorrarComponent},
        ]
    }
];