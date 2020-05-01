import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { UsuarioService } from './usuario.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  taxista: AngularFirestoreDocument<any>;
  private watch: Subscription;

  constructor(
    private geolocation: Geolocation,
    private firestore: AngularFirestore,
    private usuarioService: UsuarioService
  ) {}

  public initTaxista() {
    console.log('primero');

    this.taxista = this.firestore.doc(
      `/usuarios/${this.usuarioService.idUsuario}`
    );
  }

  public initGeolocalizacion() {
    console.log('segundo');
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        console.log('tercero');
        // resp.coords.latitude
        // resp.coords.longitude
        console.log(resp.coords);

        this.updateCoords(resp.coords);

        // Creamos un observable que verifique el movimiento del gps
        this.watch = this.geolocation.watchPosition().subscribe((data) => {
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
    console.log('cuarto');
    this.taxista.update({
      lat: coords.latitude,
      lng: coords.longitude,
    });
  }

  detenerUbicacion() {
    try {
      this.watch.unsubscribe();
    } catch (error) {
      console.error(error);
    }
  }
}
