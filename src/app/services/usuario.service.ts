import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService implements CanActivate {
  public idUsuario: string;
  constructor(
    private firestore: AngularFirestore,
    private platform: Platform,
    private nativeStorage: NativeStorage,
    private router: Router
  ) {}

  public verificaUsuario(clave: string) {
    return this.firestore
      .collection(`usuarios`, (ref) => ref.where('clave', '==', clave))
      .valueChanges()
      .pipe(map((usuario: any) => usuario[0]));
  }

  public guardarStorage(key) {
    if (this.platform.is('cordova')) {
      //Celular
      this.nativeStorage.setItem('clave', key).then(
        () => {
          this.idUsuario = key;
          console.log('Stored item!');
          this.router.navigate(['home']);
        },
        (error) => console.error('Error storing item', error)
      );
    } else {
      //Escritorio
      localStorage.setItem('clave', key);
      this.idUsuario = key;
    }
  }

  public cargarStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        //Celular
        this.nativeStorage.getItem('clave').then(
          (data) => {
            console.log('clave ' + data);
            this.idUsuario = data;
            resolve(true);
          },
          (error) => {
            console.error(error);
            resolve(false);
          }
        );
      } else {
        //Escritorio
        if (localStorage.getItem('clave')) {
          this.idUsuario = localStorage.getItem('clave');
          resolve(true);
        } else {
          resolve(false);
        }
        resolve(true);
      }
    });
  }

  canActivate() {
    this.cargarStorage().then((data) => {
      if (data) {
        // logged in so return true
        this.router.navigate(['home']);
        return false;
      }

      // not logged in so redirect to login page

      return true;
    });

    return true;
  }

  borrarUsuario() {
    this.idUsuario = null;
    if (this.platform.is('cordova')) {
      this.nativeStorage.clear();
    } else {
      localStorage.clear();
    }
  }
}
