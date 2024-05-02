import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/entities/auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: any = {};
  errorMessage: string = '';

  constructor(private authService: AuthService,
              private router: Router
  ) { }

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.errorMessage = '';
        this.authService.saveToken(response.token);
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Error en la autenticación.';
      }
    });
  }
}
