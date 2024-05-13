import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Cancion } from '../model/cancion.model';
import { AuthService } from 'src/app/entities/auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CancionService{

  private baseUrl = 'http://localhost:8080/kreitekfy';
  // headers = new HttpHeaders({
  //   'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
  // });

  constructor(private http: HttpClient, private authService: AuthService) { }


  public obtenerCanciones(page: number, size: number, sort: string, filters?: string): Observable<Cancion[]> {
    const token = this.authService.getToken();
    let headers = this.obtenerHeadersConToken();
    let urlEndpoint =`${this.baseUrl}/canciones?page=` + page + '&size=' + size + '&sort=' + sort;
    if(filters){
      urlEndpoint = urlEndpoint + "&filter=" + filters;
    }

    return this.http.get<Cancion[]>(urlEndpoint, { headers });

  }
  public obtenerCancionPorId(cancionId: number): Observable<Cancion>{
    let urlEndpoint: string = `${this.baseUrl}/canciones/`+ cancionId;
    const token = this.authService.getToken();
   let headers = this.obtenerHeadersConToken();
    return this.http.get<Cancion>(urlEndpoint, { headers });

  }
  public actualizarCancion(cancion: Cancion): Observable<Cancion>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    });
    return this.http.patch<Cancion>(`${this.baseUrl}/canciones/`+ cancion.id, cancion, { headers: headers });

  }

  // comprobarUsuario(): Observable<any> {
  //   let urlEndpoint: string = `${this.baseUrl}/whoami`;
  //   const token = this.authService.getToken();
  //   let headers = this.obtenerHeadersConToken();
  //   return this.http.get<any>(urlEndpoint, { headers });
  // }

  private obtenerHeadersConToken(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
}