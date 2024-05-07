import { ValoracionCancion } from "../../valoracionCancion/model/valoracionCancion.model";

export class Usuario {

    nombreDeUsuario: string;
    password: string;
    apellidos: string;
    email: string;
    role: string
    valoracionesDeCanciones: ValoracionCancion[];
 
    constructor(
    nombreDeUsuario: string,
    password: string,
    apellidos: string,
    email: string,
    rolUsuario: string,
    valoracionesDeCanciones: ValoracionCancion[]
) {
    this.nombreDeUsuario = nombreDeUsuario
    this.password = password
    this.apellidos = apellidos
    this.email = email
    this.role = rolUsuario
    this.valoracionesDeCanciones = valoracionesDeCanciones;
  }   
  

}