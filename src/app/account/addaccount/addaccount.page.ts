import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AccountService, person, family, enterprise} from './../../services/account.service';


@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.page.html',
  styleUrls: ['./addaccount.page.scss']
})
export class AddaccountPage implements OnInit {

  person: person = {
    account_balance: '',
    account_name: '',
    account_type: '',
    account_user_id: '',
    account_user_name: ''
  };

  family: family = {
    account_balance: '',
    account_name: '',
    account_member: [],
    account_type: '',

  };

  enterprise: enterprise = {
    account_balance: '',
    account_department: '',
    account_member: [],
    account_name: '',
    account_type: ''
  };

  public thtype: string;
  public type: string;
  public user_session: any = [];
  public name_account: string;
  public department: string;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public alertController: AlertController,
    public userService: UserService,
    public accountService: AccountService
  ) {}

  ngOnInit() {
    this.loaduser();
    this.type = 'Personal';
  }
  /*
  Function Name : ionViewWillEnter
  Author : -
  Description : เช็ตข้อมูลของผู้ใช้
  */
  async ionViewWillEnter() {
    await this.loaduser();
  }
  /*
  Function : กลับสู่หน้าแสดงบัญชี
  name : Naruemon
  Date : 2020-03-10
   */
  back() {
    this.router.navigate(['showaccount'], { replaceUrl: true })
  }

  // Function : confirm กดปุ่มเพื่อยืนยันเพิ่มบัญชี
  // name : Chatchalerm Wasuanunkul
  // Date : 2020-03-09
  async confirm() {

    if (this.type == 'Family') {
      this.thtype = 'ครอบครัว';
    } else if (this.type == 'Personal') {
      this.thtype = 'ส่วนตัว';
    } else {
      this.thtype = 'องค์กร';
    }

    const alert = await this.alertController.create({
      header: 'ยืนยันการเพิ่มบัญชีผู้ใช้?',
      message: 'คุณต้องการเพิ่มบัญชีประเภท ' + this.thtype + ' หรือไม่?',
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
            if (this.type == 'Personal') {
              this.add_account(this.type);
            } else if (this.type == 'Family') {
              this.add_account(this.type);
            } else if (this.type == 'Enterprise') {
              this.add_account(this.type);
            }
            console.log('Confirm Okay');
            this.go_to_showaccount();
          }
        }
      ]
    });
    await alert.present();
  }
  /*
  Function : เพิ่มบัญชี
  name : Naruemon
  Date : 2020-03-09
   */
  go_to_showaccount() {
    this.router.navigate(['showaccount']);
  }
  /*
  Function : เพิ่มบัญชี
  name : Naruemon
  Date : 2020-03-09
   */
  add_account(type: String) {

      if (type == 'Personal') {
        this.person.account_balance = '0';
        this.person.account_name = this.name_account;
        this.person.account_type = 'Personal';
        this.person.account_user_id = this.user_session.user_id;
        this.person.account_user_name = this.user_session.user_name;
        this.accountService.add_account_person(this.person);
      } else if (type == 'Family') {
        this.family.account_balance = '0';
        this.family.account_name = this.name_account;
        this.family.account_member = [this.user_session];
        this.family.account_type = 'Family';
        console.log(this.family)
        this.accountService.add_account_family(this.family);
      } else if (type == 'Enterprise') {
        this.enterprise.account_balance = '0';
        this.enterprise.account_department = this.department;
        this.enterprise.account_member = [this.user_session];
        this.enterprise.account_name = this.name_account;
        this.enterprise.account_type = 'Enterprise';
        this.accountService.add_account_enterprise(this.enterprise);
      }
  }


  async loaduser() {
    this.user_session = await this.userService.get_session_user()
    //console.log(this.user_session);
  }
  /*
  Function : add_record วันที่บันทึกข้อมูล
  name : Naruemon
  Date : 2020-03-09
   */
  add_record() {
    const date = new Date();
    console.log(date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear());
    // this.record_account.account_id = this.account.id;
    // this.record_account.account_name = this.account.name_account;
    // this.record_account.user_record = [];

    // this.recordService.add_record(this.record_account);
  }
}
