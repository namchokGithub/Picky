import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';
import { UserService, User} from 'src/app/services/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  status = true;
  statusDelete = false;
  name: string;
  User: User = {
    id: '',
    user_id: '',
    user_name: '',
    user_password: ''
  };
  public user_session: any = [];
  constructor(public alertController: AlertController, private router: Router, private userService: UserService) {
  }
  ngOnInit() {

    this.user_session =  this.userService.get_session_user();

      this.name = this.user_session.user_name;
  }

  async editName() {
    if (this.status == true) {
        // hide edit
          this.status = false;
      } else {
        // show edit
          this.status = true;
      }
  }

  async deleteUser() {
      // ส่วนที่แสดงแจ้งเตือน ว่าต้องการลบบัญชีผู้ใช้หรือไม่ ?
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
          // console.log(this.name);
          console.log('กดต้องการลบ');
          this.user_session =  this.userService.get_session_user();
          console.log(this.user_session.id);
         this.userService.delete_user(this.user_session.id);
          this.router.navigate(['login'], { replaceUrl: true });
        }
      }]
    });

    await alert.present();

  }

  async successToEdit() {
    // ส่วนที่แสดงแจ้งเตือนในการแก้ไขข้อมูล
    const alert = await this.alertController.create({
    header: 'ต้องการเปลี่ยนชื่อ?',
    message: 'คุณต้องการเปลี่ยนชื่อหรือไม่',
    buttons: [
      {
        text: 'ไม่ต้องการ',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.name = this.user_session.user_name;
          this.status = true;
          // ถ้า cancle ก็เอาตัวแปลจาก tempName มาไว้ที่ name
          // show edit
        }
      }, {
        text: 'ต้องการ',
        handler: () => {
          // console.log(this.name);
          this.status = true;
          console.log('กด ต้องการ');
          this.User.id = this.user_session.id;
          this.User.user_id = this.user_session.user_id;
          this.User.user_name = this.name;
          this.User.user_password = this.user_session.user_password;
          console.log(this.User);
          this.userService.update_name_user(this.User);
        }
      }
    ]
  });

    await alert.present();

  }



}
