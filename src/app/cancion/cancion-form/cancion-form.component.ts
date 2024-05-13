import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CancionService } from '../../entities/cancion/service/cancion.service';
import { Cancion } from '../../entities/cancion/model/cancion.model';
import { ValoracionCancionService } from '../../entities/valoracionCancion/service/valoracion-cancion.service';
import { ValoracionCancion } from '../../entities/valoracionCancion/model/valoracionCancion.model';
import { ReproduccionCancion } from '../../entities/reproduccionCancion/model/reproduccionCancion.model';
import { ReproduccionCancionService } from 'src/app/entities/reproduccionCancion/service/reproduccion-cancion.service';
import { UsuarioService } from 'src/app/entities/usuario/service/usuario.service';

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
  reproduccionesDeUsuario=0;
  
 

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private cancionService: CancionService, 
    private valoracionCancionService: ValoracionCancionService, 
    private reproduccionCancionservice: ReproduccionCancionService, 
    private usuarioService: UsuarioService
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
      this.comprobarUsuario();
      this.obtenerValoraciones();
      this.obtenerReproducciones();
 
    }  
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
    if (this.reproduccionesCanciones.length > 0) {
      const reproduccionesDeCancion = this.reproduccionesCanciones
        .filter(reproduccion => reproduccion.cancionId === this.cancionId)
        .reduce((totalReproducciones) => totalReproducciones + 1, 0);
      
      this.reproduccionesDeUsuario = reproduccionesDeCancion;
    } else {
      this.reproduccionesDeUsuario = 0;
    }
  }
  public reproducir(): void {
    const reproduccionCancion= new ReproduccionCancion(this.username!, this.cancionId!, this.cancion?.nombre!,(this.reproduccionesDeUsuario+1),new Date(), this.cancion?.estilo! );
   
    this.reproduccionCancionservice.anadirReproduccionACancion(this.username!, reproduccionCancion).subscribe({
    next: (reproduccionCancion) => {this.reproduccionesCanciones = reproduccionCancion
     this.reproduccionesDeCancionSeleccionada();
     this.anadeReproduccionDeUsuarioAReproduccionTotal();
    },
    error: (error) => {this.handleError(error);}
   })
  }
  private anadeReproduccionDeUsuarioAReproduccionTotal(){
    this.cancion!.reproducciones +=1;
    this.cancionService.actualizarCancion(this.cancion!).subscribe({
      next: (cancion) => {this.cancion = cancion},
      error: (error) => {this.handleError(error);}
    })
  }
  private handleError(err: any):void{
    console.log(err);
  }
}
