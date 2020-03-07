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
    // เก็บชื่อไว้ในตัวแปล tempName
    tempName
    if(this.status === true) {
      // hide edit
        this.status = false;
    } else {
      // show edit
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
          // ถ้า cancle ก็เอาตัวแปลจาก tempName มาไว้ที่ name
          // show edit
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
