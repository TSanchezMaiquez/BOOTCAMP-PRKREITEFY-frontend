import { Component, OnInit } from '@angular/core';
import { Cancion } from 'src/app/entities/cancion/model/cancion.model';
import { CancionService } from 'src/app/entities/cancion/service/cancion.service';

@Component({
  selector: 'app-cancion-list',
  templateUrl: './cancion-list.component.html',
  styleUrls: ['./cancion-list.component.scss']
})
export class CancionListComponent implements OnInit{

  nombre?: string;
  artistaNombre?: string;
  albumTitulo?: string;
  estilo?: string;
  canciones: Cancion [] = [];

  page: number = 0;
  size: number = 5;
  sort: string = 'estilo,asc';

  first: boolean = false;
  last: boolean = false;
  totalPages: number = 0;
  totalElements: number = 0;

  constructor(private cancionService: CancionService){}

public ngOnInit(): void {
    this.busquedaPorFiltros();
  }

public busquedaPorFiltros(){
  const filtros: string | undefined = this.construirFiltros();
  this.cancionService.obtenerCanciones(this.page, this.size, this.sort, filtros).subscribe({
      next: (data:any) =>{
          this.canciones = data.content;
          this.first = data.first;
          this.last = data.last;
          this.totalPages = data.totalPages;
          this.totalElements = data.totalElements;
      },
      error: (error) => {this.handleError(error);}
  })

}
private construirFiltros(): string | undefined{

  const filters: string[] = [];

  if (this.nombre){
    filters.push("nombre:MATCH:"+ this.nombre);
  }
  if (this.artistaNombre){
    filters.push("artistaNombre:MATCH:"+ this.artistaNombre);
  }
  if(this.albumTitulo){
    filters.push("albumTitulo:MATCH:"+ this.albumTitulo);
  }
  if(this.estilo){
    filters.push("estilo:EQUAL:"+ this.estilo);
  }
  if(filters.length>0){
    return filters.join(',');
  }else{
    return undefined;
  }
}

public navegarSiguiente():void{
  this.page++;
  this.busquedaPorFiltros();
}

public navegarAnterior():void{
  this.page--;
  this.busquedaPorFiltros();
}

private handleError(err: any){
  console.log(err);
}
}
