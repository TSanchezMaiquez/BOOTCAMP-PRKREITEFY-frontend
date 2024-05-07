import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CancionService } from '../service/cancion.service';
import { Cancion } from '../model/cancion.model';
import { ValoracionCancionService } from '../../entities/valoracionCancion/service/valoracion-cancion.service';
import { ValoracionCancion } from '../../entities/valoracionCancion/model/valoracionCancion.model';

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
  
 

  constructor(private route: ActivatedRoute, private cancionService: CancionService, private valoracionCancionService: ValoracionCancionService){}



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
      console.log(valoracionCancion)
    },
    error: (error) => {this.handleError(error);}
   })
  }
  private obtenerValoraciones(): void{
    this.valoracionCancionService.obtenerValoraciones(this.username!).subscribe({
      next: (valoracionCancion) => {this.valoracionesCanciones = valoracionCancion
        console.log("Holaaaaaa"+this.valoracionesCanciones.length)
        this.valoracionDeCancionSeleccionada();
      },
      error: (error) => {this.handleError(error);}
    })
  }
  private valoracionDeCancionSeleccionada(){
    console.log("dentro");
    if(this.valoracionesCanciones.length>0){
      console.log("dentro del if")
      for (let i = 0; i < this.valoracionesCanciones.length; i++) {
        const valoracionCancion = this.valoracionesCanciones[i];
        if (valoracionCancion.usuarioId === this.username && valoracionCancion.cancionId === this.cancionId) {
            this.valoracion = valoracionCancion.valoracion;
            break; 
        }
    }
    }
  }
  private handleError(err: any):void{
    console.log(err);
  }
}
