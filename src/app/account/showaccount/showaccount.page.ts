import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { VirtualTimeScheduler } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from 'src/app/services/user.service';
import { AlertController } from '@ionic/angular';

import {
  AccountService,
  person,
  family,
  enterprise
} from 'src/app/services/account.service';

@Component({
  selector: 'app-showaccount',
  templateUrl: './showaccount.page.html',
  styleUrls: ['./showaccount.page.scss']
})
export class ShowaccountPage implements OnInit {
  public name = '';
  public session: any = [];
  public account_person: any = [];
  public account_family: any = [];
  public account_enterprise: any = [];

  public checkStatus = false;

  constructor(
    public menu: MenuController,
    public navCtrl: NavController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public userService: UserService,
    public accountService: AccountService,
    public loadingController: LoadingController,
    public alertCtrl: AlertController
  ) {}

  /*
  Function Name : ngOnInit
  Author : Naruemon
  Description : เรียกใช้ฟังก์ชันการทำงานที่เกี่ยวข้อง
  */
  async ngOnInit() {
    this.menu.enable(false, 'menuSilde');
    this.checkStatus = false;
    this.account_person = [];
    this.account_family = [];
    this.account_enterprise = [];
    this.menu.enable(false, 'menuSilde');
    this.presentLoading();
    this.setSession();
  }

  /*
  Function Name : ionViewWillEnter
  Author : -
  Description : เช็ตข้อมูลของผู้ใช้
  */
  async ionViewWillEnter() {
    console.log(this.checkStatus)
    this.session = await this.userService.get_session_user();
    this.name = await this.userService.getUsername();
  }
  /*
  Function Name : setSession
  Author : -
  Description : เช็ตข้อมูลของผู้ใช้
  */
  async setSession() {
    this.session = await this.userService.get_session_user();
    this.name =  this.userService.getUsername();
    await this.get_account();
  }

  /*
  Function Name : log_out
  Author : Chatchalerm Wasuanunkul
  Description : ออกจากระบบ เพื่อกลับไปสู่หน้า log in
  */
  async log_out() {
    const alert = await this.alertCtrl.create({
      header: 'ยืนยันการออกจากระบบ?',
      message: 'คุณต้องการออกจากระบบหรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Log out Cancel');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Log out');
            this.popaccount();
            this.userService.logoutSession();
            this.router.navigate(['login'], { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  /*
  Function Name : get_account
  Author : Namchok
  Description : get account form db
  */
  get_account() {
    this.accountService.get_account().subscribe(res => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.length; i++) {
        if (res[i].account_type == 'Personal') {
          this.checkStatus = true;
          this.account_person.push(res[i]);
        } else if (res[i].account_type == 'Family') {
          this.account_family.push(res[i]);
          this.checkStatus = true;
        } else if (res[i].account_type == 'Enterprise') {
          this.account_enterprise.push(res[i]);
          this.checkStatus = true;
        }
      }
    });

  }

  /*
  Function Name : get_account
  Author : Naerumon
  Description : ไปสู่หน้าเพิ่มบัญชี
  */
  async openAddAccount() {
    // Test pop account | Namchok
    this.popaccount();
    await this.router.navigate(['addaccount']);
  }

  /*
  Function Name : selecet_accoun
  Author : Naerumon
  Description : เลือกบัญชีเพื่อไปสู่หน้าหลัก
  */
  selecet_account(accountId: string, accountName: string) {
    this.presentLoading();
    this.popaccount();
    this.accountService.set_session_account(accountId, accountName);
    this.router.navigate(['home']);
  }

  /*
  Function Name : gotomanagementFamily
  Author : Naerumon
  Description : ไปบัญชีประเภทครอบครัว
  */
  gotomanagementFamily(accountId: any, accountName: any) {
    this.presentLoading();
    this.popaccount();
    this.router.navigate(['familymanagement'], {queryParams: {account_id: accountId, account_name: accountName}});
  }
  /*
  Function Name : gotomanagementEnterprise
  Author : Naerumon
  Description : ไปบัญชีประเภทองค์กร
  */
  gotomanagementEnterprise(accountId: any, accountName: any) {
    this.presentLoading();
    this.popaccount();
    this.router.navigate(['enterprisemanagement'], {queryParams: {account_id: accountId, account_name: accountName}});
  }

  /*
  Function Name : removeAccount
  Author : Naerumon
  Description : ลบบัญชี
  */
  removeAccount(id: string) {
    this.presentLoading();
    this.popaccount();
    this.accountService.delete_account(id);
  }

  /*
  Function Name : presentLoading
  Author : Naerumon
  Description : หน้าต่างแสดงผลโหลดข้อมูล รอสักครู่...
  */
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'รอสักครู่...',
      duration: 200
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  popaccount() {

    while (this.account_person.length > 0) {
      this.account_person.pop();
    }

    while (this.account_family.length > 0) {
      this.account_family.pop();
    }

    while (this.account_enterprise.length > 0) {
      this.account_enterprise.pop();
    }
    /////////////////////////////////////
    console.log('account_person');
    console.log(this.account_person);

    console.log('account_family');
    console.log(this.account_family);

    console.log('account_enterprise');
    console.log(this.account_enterprise);
  }
}
