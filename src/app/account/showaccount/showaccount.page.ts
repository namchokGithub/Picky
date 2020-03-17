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
  public name: string = '';
  private session: any = [];
  private account_person: any = [];
  private account_family: any = [];
  private account_enterprise: any = [];

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

  ngOnInit() {

    this.account_person = [];
   
    this.account_enterprise = [];
    this.menu.enable(false, 'menuSilde');
    this.presentLoading();
     this.setSession();
  }

  async ionViewWillEnter() {
    this.session = await this.userService.get_session_user();
    this.name = await this.userService.getUsername();
  }

   setSession() {
    this.session =  this.userService.get_session_user();
    this.name =  this.userService.getUsername();
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
    console.log(this.session);
   
    this.accountService.get_account().subscribe(res => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < res.length; i++) {
        if (res[i].account_type == 'Personal') {
          this.account_person.push(res[i]);
     
        } else if (res[i].account_type == 'Family') {
          this.account_family.push(res[i]);
         
        } else {
          this.account_enterprise.push(res[i]);
        
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
