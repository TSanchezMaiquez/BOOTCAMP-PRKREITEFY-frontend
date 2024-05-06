import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/entities/usuario/model/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/entities/usuario/service/usuario.service';
import { Cancion } from 'src/app/cancion/model/cancion.model';
import { CancionService } from 'src/app/cancion/service/cancion.service';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.scss']
})
export class PaginaInicioComponent implements OnInit{
  canciones: Cancion[] = [];
  ultimasCancionesAnadidas: Cancion[] = [];
  username?: string;
  usuario?: Usuario;

  estiloCancion?: string;

  page: number = 0;
  size: number = 5;
  sort: string = 'id,asc';

  constructor(private router: Router, private cancionService: CancionService, private route: ActivatedRoute, private usuarioService: UsuarioService){}


  ngOnInit(): void {
    this.obtenerUltimasCancionesAnadidas();
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.username = username;
    }
    this.obtenerUsuario();
   
  }
  private obtenerCanciones(): void {
   
    this.cancionService.obtenerCanciones().subscribe({
      
      next: (canciones: any) => {this.canciones = canciones.content;
    
      },
      error: (err) => {this.handleError(err);}
    })
  }

  public obtenerUltimasCancionesAnadidas(): void{
    const filtros: string | undefined = this.anadirFiltros();
    const sort: string = 'artistaNombre,asc'; //fechaInsercion
    this.cancionService.obtenerUltimasCancionesAnadidas(this.page, this.size, sort, filtros).subscribe({
      next: (data: any) => {
        this.ultimasCancionesAnadidas = data.content;},
      error: (error) => {this.handleError(error);}
      
    });
  }

  private obtenerUsuario(): void {
   
    this.usuarioService.obtenerUsuario(this.username!).subscribe({
      
      next: (usuario) => {this.usuario = usuario},
      error: (err) => {this.handleError(err);}
    })
    
  }

  public logout(): void{
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
  private anadirFiltros(): string | undefined{

    const filtros: string[] = [];

    if (this.estiloCancion){
      filtros.push("estilo:MATCH:"+ this.estiloCancion);
    }
    
    if(filtros.length>0){
      return filtros.join(',');
    }else{
      return undefined;
    }
  }

  
  private handleError(err: any){
    console.log(err);
  }
}
