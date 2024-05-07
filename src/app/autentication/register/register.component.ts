import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/entities/auth/service/auth.service';
import { Usuario } from 'src/app/entities/usuario/model/usuario.model';
import { ValoracionCancion } from 'src/app/entities/valoracionCancion/model/valoracionCancion.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  valoraciones: ValoracionCancion[] = [];
  user: Usuario = new Usuario('', '', '', '', "USER", this.valoraciones);
  constructor(private authService: AuthService,
    private router: Router) { }

  register(): void {
  console.log("registro: ", this.user);
    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/inicio', this.user.nombreDeUsuario]);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
}
