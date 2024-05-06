import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/kreitekfy';

  constructor(private http: HttpClient) { }

  obtenerUsuario(nombreDeUsuario: string): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    });

    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/`+ nombreDeUsuario, { headers: headers });
  }
}
