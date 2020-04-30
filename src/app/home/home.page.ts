import { Component } from '@angular/core';
import { UbicacionService } from '../services/ubicacion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private ubicacionService: UbicacionService) {
    this.ubicacionService.initGeolocalizacion();
  }
}
