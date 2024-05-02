export class Usuario {

    nombreDeUsuario: string;
    password: string;
    apellidos: string;
    email: string;
    role: string
 
    constructor(
    nombreDeUsuario: string,
    password: string,
    apellidos: string,
    email: string,
    rolUsuario: string
) {
    this.nombreDeUsuario = nombreDeUsuario
    this.password = password
    this.apellidos = apellidos
    this.email = email
    this.role = rolUsuario
  }   
  

}