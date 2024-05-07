export class ReproduccionCancion {
    
    usuarioId: string;
    cancionId: number;
    cancionNombre: string;
    reproducciones: number;
    fechaDeReproduccion: Date;


  constructor(
    usuarioId: string,
    cancionId: number,
    cancionNombre: string,
    reproducciones: number,
    fechaDeReproduccion: Date
  ) {
    this.usuarioId = usuarioId;
    this.cancionId = cancionId;
    this.cancionNombre = cancionNombre;
    this.reproducciones = reproducciones;
    this.fechaDeReproduccion = fechaDeReproduccion;
  }

}
