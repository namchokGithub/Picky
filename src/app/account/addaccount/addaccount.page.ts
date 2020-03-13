import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserService, User } from 'src/app/services/user.service';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.page.html',
  styleUrls: ['./addaccount.page.scss']
})
export class AddaccountPage implements OnInit {
  
  private type: string;
  private user_session: any = [];
  private account: any = [];
  private name_account: string;
  constructor(
    public navCtrl: NavController,
    private router: Router,
    public alertController: AlertController,
    private userService: UserService,
    
  ) {}

  ngOnInit() {
    this.loaduser();
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
      message: 'คุณต้องการเพิ่มบัญชีประเภท ' + this.type + ' หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Confirm Okay');
            this.router.navigate(['showaccount']);
            if (this.type == 'Personal') {
                
            }
          }
        }
      ]
    });

    await alert.present();
  }

  
  loaduser() {
    this.user_session = this.userService.get_session_user();
    console.log(this.user_session);
  }

}
