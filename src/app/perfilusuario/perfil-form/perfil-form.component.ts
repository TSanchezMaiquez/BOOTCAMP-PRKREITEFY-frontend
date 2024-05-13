import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CancionService } from 'src/app/entities/cancion/service/cancion.service';
import { ReproduccionCancion } from 'src/app/entities/reproduccionCancion/model/reproduccionCancion.model';
import { ReproduccionCancionService } from 'src/app/entities/reproduccionCancion/service/reproduccion-cancion.service';
import { Usuario } from 'src/app/entities/usuario/model/usuario.model';
import { UsuarioService } from 'src/app/entities/usuario/service/usuario.service';







@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.scss']
})
export class PerfilFormComponent implements OnInit{

  username?: string;
  usuario?: Usuario;
  cancionesReproducidas: ReproduccionCancion[] = [];
  password: string = "";
  passwordRepetido: string = "";
 
  page: number = 0;
  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;


  constructor(private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private reproduccionCancionservice: ReproduccionCancionService,
    private cancionService: CancionService, 
    private router: Router
  ){}

  
  ngOnInit(): void {

   
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.username = username;
      this.comprobarUsuario();
      this.obtenerUsuario();
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
  private obtenerUsuario(): void {
   
    this.usuarioService.obtenerUsuario(this.username!).subscribe({
      
      next: (usuario) => {this.usuario = usuario},
      error: (err) => {this.handleError(err);}
    })
    
  }
  private obtenerReproducciones(): void{

    const size: number = 5;
    const sort: string = 'id.fechaDeReproduccion,desc';
    const filtro: string = "id.usuarioId:EQUAL:"+this.username! ;
    this.reproduccionCancionservice.obtenerReproduccionesPaginadas(this.page, size, sort,filtro).subscribe({
      next: (data:any) => {this.cancionesReproducidas = data.content;
        this.first = data.first;
        this.last = data.last;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
       console.log(this.cancionesReproducidas.length)
      },
      error: (error) => {this.handleError(error);}
    })
  
  }
public modificar():void{
  if(this.password && this.passwordRepetido && this.password !== this.passwordRepetido){
  }else {
    if(this.password && this.passwordRepetido && this.password===this.passwordRepetido){
      this.usuario!.password = this.password;
    }
    this.usuarioService.actualizarUsuario(this.usuario!).subscribe({
      next: (usuario) => {this.usuario=usuario
        this.password = ""
        this.passwordRepetido = ""
      },
      error: (error) => {this.handleError(error);
      }
    })
  }

}


public navegarSiguiente():void{
  this.page++;
  this.obtenerReproducciones();
}

public navegarAnterior():void{
  this.page--;
  this.obtenerReproducciones();
}
  private handleError(err: any){
    console.log(err);
  }
}
