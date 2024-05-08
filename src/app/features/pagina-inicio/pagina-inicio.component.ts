import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/entities/usuario/model/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/entities/usuario/service/usuario.service';
import { Cancion } from 'src/app/cancion/model/cancion.model';
import { CancionService } from 'src/app/cancion/service/cancion.service';
import { ReproduccionCancionService } from 'src/app/entities/reproduccionCancion/service/reproduccion-cancion.service';
import { ReproduccionCancion } from 'src/app/entities/reproduccionCancion/model/reproduccionCancion.model';
import { EstiloCancion } from '../../cancion/model/estiloCancion.model';
import { LoginComponent } from '../../autentication/login/login.component';

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
  cancionesReproducidas: ReproduccionCancion[] = [];
  cancionesDelPrimerEstilo: Cancion[] = [];
  cancionesDelSegundoEstilo: Cancion[] = [];
 

  estiloCancion?: string;

  page: number = 0;
  size: number = 5;
  sort: string = 'fechaInsercion,asc';

  constructor(private router: Router, 
    private cancionService: CancionService, 
    private route: ActivatedRoute, private usuarioService: UsuarioService,
    private reproduccionCancionservice: ReproduccionCancionService){}


  ngOnInit(): void {
    this.obtenerUltimasCancionesAnadidas();
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.username = username;
    }
    this.obtenerUsuario();
    this.obtenerReproducciones();
   
  }
  // private obtenerCanciones(): void {
   
  //   this.cancionService.obtenerCanciones().subscribe({
      
  //     next: (canciones: any) => {this.canciones = canciones.content; },
  //     error: (err) => {this.handleError(err);}
  //   })
  // }

  public obtenerUltimasCancionesAnadidas(): void{
    const filtros: string | undefined = this.anadirFiltros();
    const sort: string = 'fechaInsercion,desc';
    this.cancionService.obtenerCanciones(this.page, this.size, sort, filtros).subscribe({
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
  private obtenerReproducciones(): void{
    this.reproduccionCancionservice.obtenerReproducciones(this.username!).subscribe({
      next: (reproduccionCancion) => {this.cancionesReproducidas = reproduccionCancion 
        this.ordenarCancionesPorReproduccionDeUsuario();
      },
      error: (error) => {this.handleError(error);}
    })
  }
private ordenarCancionesPorReproduccionDeUsuario(): void {

  if(this.cancionesReproducidas.length>0){
    this.cancionesReproducidas.sort((a, b) => b.reproducciones - a.reproducciones);
  }
  this.obtenerEstilosMasReproducidosPorUsuario()
}

private obtenerEstilosMasReproducidosPorUsuario(): void{
  let estilos = [];
  estilos.push(this.cancionesReproducidas[0].estilo)
  for(let i=1; i <this.cancionesReproducidas.length; i++){
    if(this.cancionesReproducidas[i].estilo !== estilos[0]){
      estilos.push(this.cancionesReproducidas[i].estilo);
      
    }
    if(estilos.length===2){
      break;
    }
  }
  this.obtenerCancionesPorReproduccionTotalYEstilo(estilos);
}

private obtenerCancionesPorReproduccionTotalYEstilo(estilos: string[]): void{

  const numeroDeCancionesDelPrimerEstilo: number = 3;
  //let cancionesDelPrimerEstilo: Cancion[] = [];
  const filtroEstiloMasEscuchado: string = "estilo:MATCH:"+ estilos[0];

  this.obtenerCancionesEstiloMasEscuchado(filtroEstiloMasEscuchado, numeroDeCancionesDelPrimerEstilo);
  const numeroDeCancionesDelSegundoEstilo: number = 2;
  const filtroSegundoEstiloMasEscuchado: string = "estilo:MATCH:"+ estilos[1];

  this.obtenerCancionesSegundoEstiloMasEscuchado(filtroSegundoEstiloMasEscuchado, numeroDeCancionesDelSegundoEstilo);
 
}
private obtenerCancionesEstiloMasEscuchado(estiloMasEscuchado: string, numeroDeCancionesARecuperar: number): void{

  const sort: string = 'reproducciones,desc';
  this.cancionService.obtenerCanciones(this.page, numeroDeCancionesARecuperar, sort, estiloMasEscuchado).subscribe({
    next: (data: any) => {
      
      this.cancionesDelPrimerEstilo = data.content;
    console.log(this.cancionesDelPrimerEstilo.length+ "!!!!!!!!!!!!!!!!!!!!")
   
  },
    error: (error) => {
      this.handleError(error);
    }
  });
}
private obtenerCancionesSegundoEstiloMasEscuchado(estiloMasEscuchado: string, numeroDeCancionesARecuperar: number): void{

  const sort: string = 'reproducciones,desc';
  this.cancionService.obtenerCanciones(this.page, numeroDeCancionesARecuperar, sort, estiloMasEscuchado).subscribe({
    next: (data: any) => {
      
      this.cancionesDelSegundoEstilo = data.content;
    console.log(this.cancionesDelSegundoEstilo.length+ "!!!!!!!!!!!!!!!!!!!!")
   
  },
    error: (error) => {
      this.handleError(error);
    }
  });
}
  private handleError(err: any){
    console.log(err);
  }
}
