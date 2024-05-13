import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValoracionCancion } from '../model/valoracionCancion.model';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValoracionCancionService {

  private baseUrl = 'http://localhost:8080/kreitekfy';


  constructor(private http: HttpClient, private authService: AuthService) { }


  public anadirValoracionACancion(username: string, valoracionCancionDto: ValoracionCancion): Observable<ValoracionCancion[]> {
    let urlEndpoint: string = `${this.baseUrl}/usuarios/${username}/canciones`;
    let headers = this.obtenerHeadersConToken();
    return this.http.put<ValoracionCancion[]>(urlEndpoint, valoracionCancionDto, {headers });
  }
  
  public obtenerValoraciones(username:string): Observable<ValoracionCancion[]> {
    let urlEndpoint: string = `${this.baseUrl}/usuarios/${username}/canciones`;
    let headers = this.obtenerHeadersConToken();
    return this.http.get<ValoracionCancion[]>(urlEndpoint, {headers });
  }
  private obtenerHeadersConToken(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}
