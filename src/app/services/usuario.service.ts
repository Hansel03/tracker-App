import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  items: Observable<any[]>;
  constructor(private firestore: AngularFirestore) {}

  public verificaUsuario(clave: string) {
    clave.toLocaleLowerCase();
    return this.firestore
      .collection(`usuarios`, (ref) => ref.where('clave', '==', clave))
      .valueChanges()
      .pipe(map((usuario) => usuario[0]));
  }
}
