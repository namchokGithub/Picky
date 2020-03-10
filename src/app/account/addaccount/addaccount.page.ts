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
  typeAccount = "";
  nameAccount = '';

  constructor(public navCtrl: NavController, private router: Router , public alertController: AlertController) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['showaccount'], { replaceUrl: true });
  }

  // Function : confirm กดปุ่มยืนยันเพิ่มบัญชี 
  // name : Chatchalerm
  // Date : 2020-03-09
  async confirm() {
    const alert = await this.alertController.create({
      header: 'ยืนยันการเพิ่มบัญชีผู้ใช้?',
      message: 'คุณต้องการเพิ่มบัญชีประเภท ' + this.typeAccount + ' หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['showaccount'], { queryParams: {Name_Account: this.nameAccount , Type_Account: this.typeAccount} });
            console.log(this.nameAccount+','+this.typeAccount)
          }
        }
      ]
    });

    await alert.present();
  }

}
