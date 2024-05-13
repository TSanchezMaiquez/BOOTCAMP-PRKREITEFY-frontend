import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/entities/auth/service/auth.service';
import { UsuarioService } from 'src/app/entities/usuario/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: any = {};
  errorMessage: string = '';

  constructor(private authService: AuthService,
              private router: Router, private usuarioService: UsuarioService
  ) { }

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.errorMessage = '';
        this.authService.saveToken(response.token);
        
        this.router.navigate(['/inicio', this.credentials.username]);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Error en la autenticación.';
      }
    });
  }

}
