/**
 * @File : familymanagement.page.ts
 * service of family management
 */

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule , ActivatedRoute} from '@angular/router';
import { AlertController , ToastController, NavController} from '@ionic/angular';
import { AccountService , family} from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-familymanagement',
  templateUrl: './familymanagement.page.html',
  styleUrls: ['./familymanagement.page.scss'],
})
export class FamilymanagementPage implements OnInit {

  public account_id: string;
  public account_name: string;
  public sharename: string;
  public db_user = [];
  public account: any = [];
  public user_search: any = [];
  public user_session = [];

  public family: family = {
    id: '',
    account_balance: '',
    account_name: '',
    account_member: [],
    account_type: '',
  };

  constructor(
              public navCtrl: NavController,
              public router: Router,
              public alertController: AlertController,
              public activatedRoute: ActivatedRoute,
              public accountService: AccountService,
              public userService: UserService,
              public toastController: ToastController
    ) { }

  async ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.account_id  = params.get('account_id');
      console.log(this.account_id);
      this.account_name = params.get('account_name');
      console.log(this.account_name);
    });

    this.userService.get_user().subscribe(async res => {
      this.db_user = res;
    });

    this.user_session = await this.userService.get_session_user();
    // console.log('this.user_session');
    console.log(this.user_session);
    this.accountService.get_acount_family_By_Id(this.account_id).subscribe(res => {
      this.account = res;
      this.setaccount();
    });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  //  Function: back กด icon ย้อนกลับ เพื่อไปยังหน้า showaccount
  //  Name: Chomphunut
  //  Date: 6/3/20
  back() {
    this.router.navigate(['showaccount'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  //  Function: logout กด icon ออกจากระบบ เพื่อไปยังหน้า login
  //  Name: Chomphunut
  //  Date: 6/3/20
  logout() {
    this.router.navigate(['login'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  //  Function: delete กดเพื่อลบรายชื่อจาก List Shared with
  //  Name: Chomphunut
  //  Date: 7/3/20
  // delete(id: string) {
  //   console.log(id);
  // }

  //  Function: confirm กด icon ออกจากหน้า familymanagement เพื่อไปยังหน้า showaccount
  //  Name: Chomphunut
  //  Date: 10/3/20
  confirm() {
    this.router.navigate(['showaccount'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  //  Function: alert แจ้งเตือนเพื่อนยืนยัน
  //  Name: Chomphunut
  //  Date: 10/3/20
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
            this.family.account_member.push(this.user_search);
            this.accountService.update_account_family(this.family);
            this.confirm();
          }
        }
      ]
    });
    await alert.present();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  //  Function: Set Account ที่ทำการแชร์
  //  Name: Chomphunut
  //  Date: 14/3/20
  //  Edit by Komsan
  setaccount() {
    this.family.id = this.account_id;
    this.family.account_balance = this.account.account_balance;
    this.family.account_name = this.account.account_name;
    this.family.account_member = this.account.account_member;
    this.family.account_type = this.account.account_type;
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  //  Function: Sear chusername เพื่อคนหาผู้ที่ทำการแชร์บัญชี
  //  Name: Chomphunut
  //  Date: 14/3/20
  //  Edit by Komsan
  searchusername() {
    this.user_search = this.db_user.find(user => user.user_id === this.sharename);
    if (this.user_search.user_id == this.sharename) {
      this.showToast('ค้นหาผู้ใช้พบ');
    }
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  //  Function: Show toast แสดงข้อความ
  //  Name: Chomphunut
  //  Date: 14/3/20
  //  Edit by Komsan
  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
  // ----------------------------------------------------------------------------------------------------------------- //
}
