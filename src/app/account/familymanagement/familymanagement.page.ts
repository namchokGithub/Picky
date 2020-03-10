import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-familymanagement',
  templateUrl: './familymanagement.page.html',
  styleUrls: ['./familymanagement.page.scss'],
})
export class FamilymanagementPage implements OnInit {
  Name = ["Namhokss","Chomphunut","Mint","Ice"];

  constructor(public navCtrl: NavController, private router: Router, public alertController: AlertController) { }


  ngOnInit() {
  }

  //  Function: back กด icon ย้อนกลับ เพื่อไปยังหน้า showaccount
  //  Name: Chomphunut 
  //  Date: 6/3/20
  back() {
    this.router.navigate(['showaccount'], { replaceUrl: true });
  }

  //  Function: logout กด icon ออกจากระบบ เพื่อไปยังหน้า login
  //  Name: Chomphunut 
  //  Date: 6/3/20
  logout() {
    this.router.navigate(['login'], { replaceUrl: true });
  }

  //  Function: delete กดเพื่อลบรายชื่อจาก List Shared with 
  //  Name: Chomphunut 
  //  Date: 7/3/20
  delete(name:string) {
    let index = this.Name.indexOf(name)
    //console.log(index)
    this.Name.splice(index, 1);
   }

  //  Function: confirm กด icon ออกจากหน้า familymanagement เพื่อไปยังหน้า showaccount
  //  Name: Chomphunut 
  //  Date: 10/3/20
  confirm() {
    this.router.navigate(['showaccount'], { replaceUrl: true });
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'ยืนยัน',
      message: 'คุณต้องการยืนยันรายชื่อหรือไม่?',
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
            this.confirm();
          }
        }
      ]
    });

    await alert.present();
  }
}
