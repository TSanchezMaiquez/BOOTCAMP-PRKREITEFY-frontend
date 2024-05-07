import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReproduccionCancion } from '../model/reproduccionCancion.model';

@Injectable({
  providedIn: 'root'
})
export class ReproduccionCancionService {

  private baseUrl = 'http://localhost:8080/kreitekfy';
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
  });

  constructor(private http: HttpClient) { }

  public anadirReproduccionACancion(username: string, ReproduccionCancion: ReproduccionCancion): Observable<ReproduccionCancion[]> {
    let urlEndpoint: string = `${this.baseUrl}/usuarios/${username}/reproducciones`;
    return this.http.put<ReproduccionCancion[]>(urlEndpoint, ReproduccionCancion, { headers: this.headers });
  }
  public obtenerReproducciones(username:string): Observable<ReproduccionCancion[]> {
    let urlEndpoint: string = `${this.baseUrl}/usuarios/${username}/reproducciones`;
    return this.http.get<ReproduccionCancion[]>(urlEndpoint, { headers: this.headers });
  }
}
