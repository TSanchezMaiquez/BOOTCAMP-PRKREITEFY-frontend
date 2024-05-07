export class ValoracionCancion {


    usuarioId: string;
    cancionId: number;
    cancionNombre: string;
    valoracion: number;

    
  constructor(
    usuarioId: string, 
    cancionId: number, 
    cancionNombre: string, 
    valoracion: number
) {
    this.usuarioId = usuarioId
    this.cancionId = cancionId
    this.cancionNombre = cancionNombre
    this.valoracion = valoracion
  }



}