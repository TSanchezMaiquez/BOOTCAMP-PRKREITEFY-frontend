import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/entities/auth/service/auth.service';
import { Usuario } from 'src/app/entities/usuario/model/usuario.model';
import { UsuarioService } from 'src/app/entities/usuario/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: any = {};
  errorMessage: string = '';
  usuario?: Usuario;

  constructor(private authService: AuthService,
              private router: Router, private usuarioService: UsuarioService
  ) { }

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.errorMessage = '';
        this.authService.saveToken(response.token);
        this.obtenerUsuario();
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Error en la autenticación.';
      }
    });
  }
  private obtenerUsuario(): void {
   
    this.usuarioService.obtenerUsuario(this.credentials.username).subscribe({
      
      next: (usuario) => {this.usuario = usuario
       
      },
      error: (err) => {this.hadleError(err);}
    })
    
  }



  private hadleError(err: any): void{
    console.log(err);
  }
}
