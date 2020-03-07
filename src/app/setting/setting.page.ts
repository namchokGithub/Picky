import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  status = true;
  name: string;
  constructor(public alertController: AlertController) {
      this.name = 'Mhee';
  }

  ngOnInit() {

  }

  async editName(){
    if(this.status === true) {
        this.status = false;
    } else {
        this.status = true;
    }
  }


  async successToEdit() {
    const alert = await this.alertController.create({
    header: 'Alert',
    subHeader: 'Subtitle',
    message: 'This is an alert message.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
        }
      }
    ]
  });

    await alert.present();

  }

}
