import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.page.html',
  styleUrls: ['./addaccount.page.scss'],
})

export class AddaccountPage implements OnInit {

  nameAccount = '';

  constructor(public navCtrl: NavController, private router: Router , public alertController: AlertController) { }

  ngOnInit() {
  }

  addaccount(){

  }

  back() {
    this.router.navigate(['showaccount'], { replaceUrl: true });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Need Confirmation?',
      message: 'Do you want to add an account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');

            this.router.navigate(['showaccount'], { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();
  }

  
}
