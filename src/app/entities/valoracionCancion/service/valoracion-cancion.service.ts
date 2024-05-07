import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValoracionCancion } from '../model/valoracionCancion.model';

@Injectable({
  providedIn: 'root'
})
export class ValoracionCancionService {

  private baseUrl = 'http://localhost:8080/kreitekfy';
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
  });

  constructor(private http: HttpClient) { }


  anadirValoracionACancion(username: string, valoracionCancionDto: ValoracionCancion): Observable<ValoracionCancion[]> {
    let urlEndpoint: string = `${this.baseUrl}/usuarios/${username}/canciones`;
    return this.http.patch<ValoracionCancion[]>(urlEndpoint, valoracionCancionDto, { headers: this.headers });
  }
  
}
