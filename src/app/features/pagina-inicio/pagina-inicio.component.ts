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
  usuario?: Usuario;
  cancionesReproducidas: ReproduccionCancion[] = [];
  cancionesDelPrimerEstilo: Cancion[] = [];
  cancionesDelSegundoEstilo: Cancion[] = [];
  cancionesMasEscuchadas: Cancion[] =[];
 

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
        this.ultimasCancionesAnadidas = data.content;},
      error: (error) => {this.handleError(error);}
      
    });
    this.obtenerCancionesConMasReproducciones();
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

  let rock:number = 0;
  let pop: number =0;
  let clasica: number = 0;
 
  for(let i=1; i <this.cancionesReproducidas.length; i++){
    if(this.cancionesReproducidas[i].estilo==="POP"){
      pop++;
    }else if(this.cancionesReproducidas[i].estilo==="ROCK"){
      rock++;
    }else{
      clasica++;
    }
  }
  let estiloMenosEscuchado: string;
  let menorValor: number = Math.min(rock, pop, clasica);

  if (menorValor === rock) {
      estiloMenosEscuchado = "ROCK";
  } else if (menorValor === pop) {
      estiloMenosEscuchado = "POP";
  } else {
      estiloMenosEscuchado = "CLASICA";
  }
  this.obtenerCancionesPorReproduccionTotalEstrellasYEstilo(estiloMenosEscuchado);
}

private obtenerCancionesPorReproduccionTotalEstrellasYEstilo(estilos: string){

  const sort: string = 'reproducciones,desc';
  let filtros = this.filtroSeccionParaTi(estilos);
  const numeroDeCancionesARecuperar: number=5;

  this.cancionService.obtenerCanciones(this.page, numeroDeCancionesARecuperar, sort, filtros).subscribe({
    next: (data: any) => {
      
      this.cancionesDelPrimerEstilo = data.content;
   
  },
    error: (error) => {
      this.handleError(error);
    }
  });

}
private filtroSeccionParaTi(estilo: string): string | undefined {
  let filters: string[] = [];
  const valoracion: number =3;

  const filtroValoracion:string = "valoracion:GREATER_THAN:" + valoracion;
  const filtroEstilos: string = "estilo:NOT_EQUAL:"+estilo ;

  filters.push(filtroEstilos);
  filters.push(filtroValoracion)

  if (filters.length > 0) {
    return filters.join(',');
  } else {
    return undefined;
  }
}






  private handleError(err: any){
    console.log(err);
  }
}
