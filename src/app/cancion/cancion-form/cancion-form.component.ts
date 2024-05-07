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
  valoracionCancion: ValoracionCancion[] = [];
  
 

  constructor(private route: ActivatedRoute, private cancionService: CancionService, private ValoracionCancionService: ValoracionCancionService){}



  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('idCancion');
    if (id) {
      this.cancionId = +id;
      this.obtenerCancionPorId();
    }  
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.username = username;
      console.log(username);
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
   this.ValoracionCancionService.anadirValoracionACancion(this.username!, valoracionCancion).subscribe({
    next: (valoracionCancion) => {this.valoracionCancion = valoracionCancion
      console.log(valoracionCancion)
    },
    error: (error) => {this.handleError(error);}
   })
  }

  private handleError(err: any):void{
    console.log(err);
  }
}
