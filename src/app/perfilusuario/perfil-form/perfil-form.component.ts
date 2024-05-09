import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
 

  constructor(private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private reproduccionCancionservice: ReproduccionCancionService,
    private router: Router
  ){}

  
  ngOnInit(): void {

   
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.username = username;
      this.obtenerUsuario();
      this.obtenerReproducciones();
    }  
  }
  private obtenerUsuario(): void {
   
    this.usuarioService.obtenerUsuario(this.username!).subscribe({
      
      next: (usuario) => {this.usuario = usuario},
      error: (err) => {this.handleError(err);}
    })
    
  }
  private obtenerReproducciones(): void{
    this.reproduccionCancionservice.obtenerReproducciones(this.username!).subscribe({
      next: (reproduccionCancion) => {this.cancionesReproducidas = reproduccionCancion 
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

  private handleError(err: any){
    console.log(err);
  }
}
