import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  clave: string;
  user: any = {};

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {}

  public async mostrarInput() {
    const alert = await this.alertController.create({
      header: 'Ingresar el usuario',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'Unsername',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ingresar',
          handler: (data: any) => {
            console.log(data);
            this.consultar(data.username);
          },
        },
      ],
    });

    await alert.present();
  }

  private async noUsuario() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuario incorrecto',
      buttons: ['OK'],
    });

    await alert.present();
  }

  private consultar(clave) {
    this.loading('Verificando...');
    this.usuarioService
      .verificaUsuario(clave)
      .subscribe(async (usuario: any) => {
        this.loadingController.dismiss();
        if (usuario) {
          console.log(usuario);
          this.clave = clave;
          this.user = usuario;
        } else {
          this.noUsuario();
        }
      });
  }

  private async loading(mensaje: string) {
    const loading = await this.loadingController.create({
      message: mensaje,
    });
    await loading.present();
  }
}
