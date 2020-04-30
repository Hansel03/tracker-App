import { Component } from '@angular/core';
import { UbicacionService } from '../services/ubicacion.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

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
  constructor(
    private ubicacionService: UbicacionService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.zoom = 15;
    this.ubicacionService.initGeolocalizacion();
    this.ubicacionService.initTaxista();

    this.ubicacionService.taxista.valueChanges().subscribe((data) => {
      console.log(data);
      this.user = data;
    });
  }

  public salir() {
    this.usuarioService.borrarUsuario();
    this.ubicacionService.detenerUbicacion();
    this.router.navigate(['login']);
  }
}
