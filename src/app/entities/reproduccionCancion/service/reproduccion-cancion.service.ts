import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReproduccionCancion } from '../model/reproduccionCancion.model';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReproduccionCancionService {

  private baseUrl = 'http://localhost:8080/kreitekfy';

  constructor(private http: HttpClient, private authService: AuthService) { }

  public anadirReproduccionACancion(username: string, ReproduccionCancion: ReproduccionCancion): Observable<ReproduccionCancion[]> {
    let headers = this.obtenerHeadersConToken();
    let urlEndpoint: string = `${this.baseUrl}/usuarios/${username}/reproducciones`;
    return this.http.put<ReproduccionCancion[]>(urlEndpoint, ReproduccionCancion, { headers });
  }
  public obtenerReproducciones(username:string): Observable<ReproduccionCancion[]> {
    let headers = this.obtenerHeadersConToken();
    let urlEndpoint: string = `${this.baseUrl}/usuarios/${username}/reproducciones`;
    return this.http.get<ReproduccionCancion[]>(urlEndpoint, { headers });
  }

  public obtenerReproduccionesPaginadas(page: number, size: number, sort: string, filters?: string): Observable<ReproduccionCancion[]> {
 
    let headers = this.obtenerHeadersConToken();
    let urlEndpoint =`${this.baseUrl}/usuarios/reproducciones?page=` + page + '&size=' + size + '&sort=' + sort;
    if(filters){
      urlEndpoint = urlEndpoint + "&filter=" + filters;
    }
    return this.http.get<ReproduccionCancion[]>(urlEndpoint, { headers });
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
