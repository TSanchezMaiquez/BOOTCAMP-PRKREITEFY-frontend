import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/entities/usuario/model/usuario.model';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/entities/usuario/service/usuario.service';
import { Cancion } from 'src/app/entities/cancion/model/cancion.model';
import { CancionService } from 'src/app/entities/cancion/service/cancion.service';
import { ReproduccionCancionService } from 'src/app/entities/reproduccionCancion/service/reproduccion-cancion.service';
import { ReproduccionCancion } from 'src/app/entities/reproduccionCancion/model/reproduccionCancion.model';


@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.scss']
})
export class PaginaInicioComponent implements OnInit{
  canciones: Cancion[] = [];
  ultimasCancionesAnadidas: Cancion[] = [];
  username?: string;
  usuarioRecibido?: string;
  usuario?: Usuario;
  cancionesReproducidas: ReproduccionCancion[] = [];
  cancionesDelPrimerEstilo: Cancion[] = [];
  cancionesDelSegundoEstilo: Cancion[] = [];
  cancionesMasEscuchadas: Cancion[] =[];
  cancionesPorValoracionYReproduccion: Cancion[] =[];
  cancionesSecParaTi: Cancion[] =[];

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
      this.comprobarUsuario();

     
 
    }
    this.obtenerUsuario();
   this.obtenerReproducciones();
   
  }
  private comprobarUsuario(): void {
    this.usuarioService.comprobarUsuario().subscribe({
      next: (usuario: any) => {
        if (usuario.nombreDeUsuario !== this.username) {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Error al comprobar usuario:', error);
        this.router.navigate(['/login']);
      }
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



//Seccion novedades
  public obtenerUltimasCancionesAnadidas(): void{
    let filtro: string = "";
    if(this.estiloCancion){
      filtro = "estilo:EQUAL:"+this.estiloCancion;
    }
    const sort: string = 'fechaInsercion,desc';
    this.cancionService.obtenerCanciones(this.page, this.size, sort, filtro).subscribe({
      next: (data: any) => {
        this.ultimasCancionesAnadidas = data.content;
        this.obtenerCancionesConMasReproducciones();
      },
      error: (error) => {this.handleError(error);}
      
    });
  }

//Seccion más escuchadas
  private obtenerCancionesConMasReproducciones():void {
    const sort: string = 'reproducciones,desc';
    const numeroDeCancionesARecuperar: number=5;
    let filtro: string = "";
    if(this.estiloCancion){
       filtro = "estilo:EQUAL:"+this.estiloCancion;
    }
  
    this.cancionService.obtenerCanciones(this.page, numeroDeCancionesARecuperar, sort, filtro).subscribe({
      next: (data: any) => {this.cancionesMasEscuchadas = data.content; },
      error: (error) => { this.handleError(error);}
    });
  
  }
 
  //Seccion para ti
  private obtenerReproducciones(): void{
    this.reproduccionCancionservice.obtenerReproducciones(this.username!).subscribe({
      next: (reproduccionCancion) => {this.cancionesReproducidas = reproduccionCancion 
        this.obtenerEstilosMasReproducidosPorUsuario()
      },
      error: (error) => {this.handleError(error);}
    })
  }

private obtenerEstilosMasReproducidosPorUsuario(): void{

  const reproduccionesPorEstilo: { [key: string]: number } = {};
  for (const cancion of this.cancionesReproducidas) {
    const estilo = cancion.estilo;
    if (reproduccionesPorEstilo.hasOwnProperty(estilo)) {
      reproduccionesPorEstilo[estilo]++;
    } else {
      reproduccionesPorEstilo[estilo] = 1;
    }
  }
  const estilosMasEscuchados: string[] = Object.keys(reproduccionesPorEstilo);
  this.obtenerCancionesPorReproduccionTotalEstrellas(estilosMasEscuchados)
}
private obtenerCancionesPorReproduccionTotalEstrellas(estilos: string[]){

  const sort: string = 'reproducciones,desc';
  const valoracion: number =3;

  const filtroValoracion:string = "valoracion:GREATER_THAN:" + valoracion;
  const numeroDeCancionesARecuperar: number=20;

  this.cancionService.obtenerCanciones(this.page, numeroDeCancionesARecuperar, sort, filtroValoracion).subscribe({
    next: (data: any) => {
      this.cancionesPorValoracionYReproduccion = data.content;
      this.cancionesSeccionParaTi(estilos);
  },
    error: (error) => {
      this.handleError(error);
    }
  });

}
private cancionesSeccionParaTi(estilos:string[]){
  if(estilos.length===0){
    this.cancionesSecParaTi = this.cancionesPorValoracionYReproduccion.slice(0, 5);
  }
  else{
    for (let i = 0; i < this.cancionesPorValoracionYReproduccion.length; i++) {
      if(this.cancionesPorValoracionYReproduccion[i].estilo===estilos[0] || this.cancionesPorValoracionYReproduccion[i].estilo===estilos[1]){
        this.cancionesSecParaTi.push(this.cancionesPorValoracionYReproduccion[i]);
      }
      if(this.cancionesSecParaTi.length===5){
        break;
      }
  }
  }
}
  private handleError(err: any){
    console.log(err);
  }
}
