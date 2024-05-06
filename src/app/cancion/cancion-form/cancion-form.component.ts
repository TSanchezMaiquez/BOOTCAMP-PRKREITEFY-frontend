import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cancion-form',
  templateUrl: './cancion-form.component.html',
  styleUrls: ['./cancion-form.component.scss']
})
export class CancionFormComponent {

  cancionId?: number;
  constructor(private route: ActivatedRoute){}



  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cancionId = +id;
    }

   
  }
}
