import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './autentication/login/login.component';
import { RegisterComponent } from './autentication/register/register.component';
import { PaginaInicioComponent } from './features/pagina-inicio/pagina-inicio.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CancionFormComponent } from './cancion/cancion-form/cancion-form.component';
import { PerfilFormComponent } from './perfilusuario/perfil-form/perfil-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PaginaInicioComponent,
    NavbarComponent,
    CancionFormComponent,
    PerfilFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
