import { Component } from '@angular/core';
import { UbicacionService } from '../services/ubicacion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  lat: number;
  lng: number;
  user: any = {};
  zoom: number;
  constructor(private ubicacionService: UbicacionService) {
    this.zoom = 15;
    this.ubicacionService.initGeolocalizacion();

    this.ubicacionService.taxista.valueChanges().subscribe((data) => {
      console.log(data);
      this.user = data;
    });
  }
}
