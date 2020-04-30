import { Component } from '@angular/core';
import { UbicacionService } from '../services/ubicacion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude = 52.520007;
  longitude = 13.404954;
  zoom: number;
  constructor(private ubicacionService: UbicacionService) {
    this.zoom = 15;
    this.ubicacionService.initGeolocalizacion();
  }
}
