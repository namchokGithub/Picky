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
  private session = [];
  private account_person = [];
  private account_family = [];
  private account_enterprise = [];

  constructor(
    private menu: MenuController,
    public navCtrl: NavController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private accountService: AccountService,
    private loadingController: LoadingController,
    public alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    this.menu.enable(false, 'menuSilde');

    await this.presentLoading();
    await this.setSession();
  }

  async ionViewWillEnter() {
    this.session = await this.userService.get_session_user();
    this.name = await this.userService.getUsername();
  }

  async setSession() {
    this.session = await this.userService.get_session_user();
    this.name = await this.userService.getUsername();
    this.get_account();
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
    let indexPerson = 0;
    let indexFamily = 0;
    let indexEnterprise = 0;

    this.accountService.get_account().subscribe(res => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.length; i++) {
        if (res[i].account_type == 'Personal') {
          this.account_person[indexPerson] = res[i];
          indexPerson++;
        } else if (res[i].account_type == 'Family') {
          this.account_family[indexFamily] = res[i];
          indexFamily++;
        } else {
          this.account_enterprise[indexEnterprise] = res[i];
          indexEnterprise++;
        }
      }
    });
  }

  /**
   * @Name Naerumon
   * เลือก Account ไปสู่หน้า Home
   */
  /* ไปสู่หน้า Add Account */
  async openAddAccount() {

    // Test pop account | Namchok
    while (this.account_person.length > 0) {
      this.account_person.pop();
      console.log(this.account_person);
    }
    /////////////////////////////////////

    await this.router.navigate(['addaccount']);
  }

  selecet_account(accountId: string, accountName: string) {
    this.presentLoading();
    this.accountService.set_session_account(accountId, accountName);
    this.router.navigate(['home']);
  }

  gotomanagementFamily(accountId: any, accountName: any) {
    this.presentLoading();
    this.router.navigate(['familymanagement'], {queryParams: {accountId, accountName}});
  }

  gotomanagementEnterprise(accountId: any, accountName: any) {
    this.presentLoading();
    this.router.navigate(['enterprisemanagement'], {queryParams: {accountId, accountName}});
  }

  removeAccount(id: string) {
    this.presentLoading();
    this.accountService.delete_account(id);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'รอสักครู่...',
      duration: 200
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }
}
