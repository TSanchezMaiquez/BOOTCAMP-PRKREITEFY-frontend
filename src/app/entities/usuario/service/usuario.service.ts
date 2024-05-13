import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/kreitekfy';

  constructor(private http: HttpClient, private authService: AuthService) { }

  obtenerUsuario(nombreDeUsuario: string): Observable<Usuario> {
    let headers = this.obtenerHeadersConToken();

    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/`+ nombreDeUsuario, { headers });
  }

  public actualizarUsuario(usuario: Usuario): Observable<Usuario>{
    let headers = this.obtenerHeadersConToken();
    return this.http.patch<Usuario>(`${this.baseUrl}/usuarios/`+ usuario.nombreDeUsuario, usuario, {headers });

  }
  private obtenerHeadersConToken(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
  comprobarUsuario(): Observable<any> {
    let urlEndpoint: string = `${this.baseUrl}/whoami`;
    const token = this.authService.getToken();
    let headers = this.obtenerHeadersConToken();
    return this.http.get<any>(urlEndpoint, { headers });
  }
}
