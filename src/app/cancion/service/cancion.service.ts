import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancion } from '../model/cancion.model';

@Injectable({
  providedIn: 'root'
})
export class CancionService{

  private baseUrl = 'http://localhost:8080/kreitekfy';

  constructor(private http: HttpClient) { }

 
  obtenerCanciones(): Observable<Cancion[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    });
    return this.http.get<Cancion[]>(`${this.baseUrl}/canciones`, { headers: headers });
  }


  public obtenerUltimasCancionesAnadidas(page: number, size: number, sort: string, filters?: string): Observable<Cancion[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    });
    let urlEndpoint =`${this.baseUrl}/canciones?page=` + page + '&size=' + size + '&sort=' + sort;
    if(filters){
      urlEndpoint = urlEndpoint + "&filter=" + filters;
    }
    return this.http.get<Cancion[]>(urlEndpoint, { headers: headers });
  }


}