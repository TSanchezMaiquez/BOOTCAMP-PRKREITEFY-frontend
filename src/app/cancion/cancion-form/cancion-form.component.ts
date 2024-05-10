import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CancionService } from '../../entities/cancion/service/cancion.service';
import { Cancion } from '../../entities/cancion/model/cancion.model';
import { ValoracionCancionService } from '../../entities/valoracionCancion/service/valoracion-cancion.service';
import { ValoracionCancion } from '../../entities/valoracionCancion/model/valoracionCancion.model';
import { ReproduccionCancion } from '../../entities/reproduccionCancion/model/reproduccionCancion.model';
import { ReproduccionCancionService } from 'src/app/entities/reproduccionCancion/service/reproduccion-cancion.service';

@Component({
  selector: 'app-cancion-form',
  templateUrl: './cancion-form.component.html',
  styleUrls: ['./cancion-form.component.scss']
})
export class CancionFormComponent {

  cancionId?: number;
  cancion?: Cancion;
  username?: string;
  valoracionesCanciones: ValoracionCancion[] = [];
  valoracion?: number;
  reproduccionesCanciones: ReproduccionCancion[] = [];
  reproducciones=0;
  
 

  constructor(private route: ActivatedRoute, 
    private cancionService: CancionService, 
    private valoracionCancionService: ValoracionCancionService, 
    private reproduccionCancionservice: ReproduccionCancionService
  ){}



  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('idCancion');
    if (id) {
      this.cancionId = +id;
      this.obtenerCancionPorId();
    }  
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.username = username;
      this.obtenerValoraciones();
      this.obtenerReproducciones();
 
    }  
  }
  private obtenerCancionPorId():void{
    this.cancionService.obtenerCancionPorId(this.cancionId!).subscribe({
      next: (cancion) => {this.cancion = cancion},
      error: (error) => {this.handleError(error);}
      
    })
  }
  public valorar(valoracion: number): void {
  
    const valoracionCancion= new ValoracionCancion(this.username!, this.cancionId!, this.cancion?.nombre!,valoracion);
   this.valoracionCancionService.anadirValoracionACancion(this.username!, valoracionCancion).subscribe({
    next: (valoracionCancion) => {this.valoracionesCanciones = valoracionCancion
      this.obtenerValoraciones();
    },
    error: (error) => {this.handleError(error);}
   })
  }
  public reproducir(): void {
    const reproduccionCancion= new ReproduccionCancion(this.username!, this.cancionId!, this.cancion?.nombre!,(this.reproducciones+1),new Date(), this.cancion?.estilo! );
    console.log("holaaaaa1")
   
    this.reproduccionCancionservice.anadirReproduccionACancion(this.username!, reproduccionCancion).subscribe({
    next: (reproduccionCancion) => {this.reproduccionesCanciones = reproduccionCancion
      console.log("holaaaaa")
     this.obtenerReproducciones();
     this.anadeReproduccionDeUsuarioAReproduccionTotal();
    },
    error: (error) => {this.handleError(error);}
   })
  }
  private anadeReproduccionDeUsuarioAReproduccionTotal(){
    this.cancion!.reproducciones +=1;
    this.cancionService.actualizarCancion(this.cancion!).subscribe({
      next: (cancion) => {this.cancion = cancion

      },
      error: (error) => {this.handleError(error);}
    })
  }
  private obtenerValoraciones(): void{
    this.valoracionCancionService.obtenerValoraciones(this.username!).subscribe({
      next: (valoracionCancion) => {this.valoracionesCanciones = valoracionCancion
        this.valoracionDeCancionSeleccionada();
      },
      error: (error) => {this.handleError(error);}
    })
  }
  private valoracionDeCancionSeleccionada(){
    if(this.valoracionesCanciones.length>0){
      for (let i = 0; i < this.valoracionesCanciones.length; i++) {
        const valoracionCancion = this.valoracionesCanciones[i];
        if (valoracionCancion.usuarioId === this.username && valoracionCancion.cancionId === this.cancionId) {
            this.valoracion = valoracionCancion.valoracion;
            break; 
        }
    }
    }
  }
  private obtenerReproducciones(): void{
    this.reproduccionCancionservice.obtenerReproducciones(this.username!).subscribe({
      next: (reproduccionCancion) => {this.reproduccionesCanciones = reproduccionCancion
       this.reproduccionesDeCancionSeleccionada();
       
      },
      error: (error) => {this.handleError(error);}
    })
  }
  private reproduccionesDeCancionSeleccionada(){
    let reproduccionesDeCancion=0;
    if(this.reproduccionesCanciones.length>0){
      for (let i = 0; i < this.reproduccionesCanciones.length; i++) {
        const reproduccionCancion = this.reproduccionesCanciones[i];
        if (reproduccionCancion.usuarioId === this.username && reproduccionCancion.cancionId === this.cancionId) {
         reproduccionesDeCancion++;
        }
    }
    this.reproducciones = reproduccionesDeCancion;
    }
  }
  private handleError(err: any):void{
    console.log(err);
  }
}
