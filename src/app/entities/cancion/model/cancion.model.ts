

export class Cancion {


    id: number;
    nombre: string;
    duracion: number;
    estilo: string;
    valoracion: number;
    reproducciones: number;
    fechaInsercion: Date;
    albumId: number;
    albumTitulo: string;
    artistaId: number;
    artistaNombre: string;
    albumImagen: string
    
  constructor(
    id: number, 
    nombre: string, 
    duracion: number, 
    estilo: string, 
    valoracion: number, 
    reproducciones: number, 
    fechaInsercion: Date, 
    albumId: number, 
    albumTitulo: string, 
    artistaId: number, 
    artistaNombre: string,
    albumImagen: string
) {
    this.id = id
    this.nombre = nombre
    this.duracion = duracion
    this.estilo = estilo
    this.valoracion = valoracion
    this.reproducciones = reproducciones
    this.fechaInsercion = fechaInsercion
    this.albumId = albumId
    this.albumTitulo = albumTitulo
    this.artistaId = artistaId
    this.artistaNombre = artistaNombre
    this.albumImagen = albumImagen
  }
}

