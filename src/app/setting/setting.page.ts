import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  status = true;
  statusDelete = false;
  name: string;
  tempName: string;
  constructor(public alertController: AlertController, private router: Router) {
      this.name = 'นายนำโชค สิงหะชัย';
  }
  ngOnInit() {

  }

  async editName() {
    // เก็บชื่อไว้ในตัวแปล tempName
    this.tempName = this.name;
    if (this.status == true) {
        // hide edit
          this.status = false;
      } else {
        // show edit
          this.status = true;
      }
  }

  async deleteName() {
    console.log(123);
      //ส่วนที่แสดงแจ้งเตือน ว่าต้องการลบบัญชีผู้ใช้หรือไม่ ?
    const alert = await this.alertController.create({
      header: 'แน่ใจหรือไม่ ?',
      message: 'การลบข้อมูล ทำให้ไม่สามารถกู้ข้อมูลกลับมาได้เช่นเดิมคุณแน่ใจหรือไม่ที่ต้องการลบ',
      buttons: [ {
        text: 'ไม่ต้องการ',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('กด ไม่ต้องการ: blah');
          this.status = true;
        }
      }, {
        text: 'ต้องการ',
        handler: () => {
          console.log(this.name);
          console.log('กด ต้องการลบ');
          this.router.navigate(['login'], { replaceUrl: true })
        }
      }]
    });

    await alert.present();

  }

  async successToEdit() {
    //ส่วนที่แสดงแจ้งเตือนในการแก้ไขข้อมูล
    const alert = await this.alertController.create({
    header: 'ต้องการเปลี่ยนชื่อ?',
    message: 'คุณต้องการเปลี่ยนชื่อหรือไม่',
    buttons: [
      {
        text: 'ไม่ต้องการ',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('กด ไม่ต้องการ: blah');
          console.log(this.tempName);
          console.log(this.name);
          this.name = this.tempName;
          this.status = true;
          // ถ้า cancle ก็เอาตัวแปลจาก tempName มาไว้ที่ name
          // show edit
        }
      }, {
        text: 'ต้องการ',
        handler: () => {
          console.log(this.name);
          console.log('กด ต้องการ');
        }
      }
    ]
  });

    await alert.present();

  }



}
