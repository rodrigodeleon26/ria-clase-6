import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hospital } from '../models/hospital';
@Injectable({
    providedIn: 'root'
})
export class HospitalesService {
    private apiUrl = 'http://localhost:3000/hospitales';
    constructor(private http: HttpClient) { }
    // Obtener la lista de hospitales
    get(): Observable<Hospital[]> {
        return this.http.get<Hospital[]>(this.apiUrl);
    }
    add(hospital: Hospital): Observable<Hospital> {
        return this.http.post<Hospital>(this.apiUrl, hospital, {});
    }
    update(hospital: Hospital): Observable<Hospital> {
        return this.http.put<Hospital>(`${this.apiUrl}/${hospital.id}`, hospital);
    }
    getHospital(id: string): Observable<Hospital> {
        return this.http.get<Hospital>(`${this.apiUrl}/${id}`);
    }
    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
