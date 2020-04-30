import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  taxista: AngularFirestoreDocument<any>;

  constructor(
    private geolocation: Geolocation,
    private firestore: AngularFirestore,
    private usuarioService: UsuarioService
  ) {
    this.taxista = firestore.doc(`/usuarios/${usuarioService.idUsuario}`);
  }

  public initGeolocalizacion() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        console.log(resp.coords);

        this.updateCoords(resp.coords);

        // Creamos un observable que verifique el movimiento del gps
        const watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
          // data.coords.latitude
          // data.coords.longitude
          console.log(data.coords);
          this.updateCoords(data.coords);
        });
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  private updateCoords(coords: any) {
    this.taxista.update({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  }
}
