import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

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

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController
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
            this.loading(data.username);
          },
        },
      ],
    });

    await alert.present();
  }

  private async loading(username) {
    const loading = await this.loadingController.create({
      message: 'Verificando...',
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
