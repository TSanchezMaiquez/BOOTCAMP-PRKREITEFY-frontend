import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autentication/login/login.component';
import { RegisterComponent } from './autentication/register/register.component';
import { PaginaInicioComponent } from './features/pagina-inicio/pagina-inicio.component';
import { CancionFormComponent } from './cancion/cancion-form/cancion-form.component';
import { PerfilFormComponent } from './perfilusuario/perfil-form/perfil-form.component';
import { CancionListComponent } from './cancion/cancion-list/cancion-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inicio/:username', component: PaginaInicioComponent },
  { path: 'cancion/:idCancion/:username', component: CancionFormComponent },
  { path: 'perfilUsuario/:username', component: PerfilFormComponent },
  { path: 'canciones', component: CancionListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
