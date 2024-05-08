export class ReproduccionCancion {
    
    usuarioId: string;
    cancionId: number;
    cancionNombre: string;
    reproducciones: number;
    fechaDeReproduccion: Date;
    estilo: string;


  constructor(
    usuarioId: string,
    cancionId: number,
    cancionNombre: string,
    reproducciones: number,
    fechaDeReproduccion: Date,
    estilo:string
  ) {
    this.usuarioId = usuarioId;
    this.cancionId = cancionId;
    this.cancionNombre = cancionNombre;
    this.reproducciones = reproducciones;
    this.fechaDeReproduccion = fechaDeReproduccion;
    this.estilo = estilo;
  }

}
