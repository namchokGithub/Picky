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

  ngOnInit() {
    this.menu.enable(false, 'menuSilde');
    this.get_account();

    this.session = this.userService.get_session_user();
    
   
    this.name = this.userService.getUsername();
    console.log(this.name);
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
            this.router.navigate(['login']);

          }
        }
      ]
    });
    await alert.present();
  }

  get_account() {
    let index_person = 0;
    let index_family = 0;
    let index_enterprise = 0;

    this.accountService.get_account().subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].account_type == 'Personal') {
          this.account_person[index_person] = res[i];
          index_person++;
        } else if (res[i].account_type == 'Family') {
          this.account_family[index_family] = res[i];
          index_family++;
        } else {
          this.account_enterprise[index_enterprise] = res[i];
          index_enterprise++;
        }
      }
    });

  }
  /* ไปสู่หน้า Add Account */
 async openAddAccount() {
    console.log('Click');

    while (this.account_person.length > 0) {
      this.account_person.pop();
      console.log(this.account_person);
    }

    await this.router.navigate(['addaccount']);
  }

  /**
   * @Name Naerumon
   * เลือก Account ไปสู่หน้า Home
   */
  selecet_account(account_id: string, account_name: string) {
    this.presentLoading();
    this.accountService.set_session_account(account_id, account_name);
    this.router.navigate(['home']);
  }

  gotomanagementFamily(account_id: any, account_name: any) {
    this.presentLoading();
    this.router.navigate(['familymanagement'], {queryParams: {account_id, account_name}});
  }

  gotomanagementEnterprise(account_id: any, account_name: any) {
    this.presentLoading();
    this.router.navigate(['enterprisemanagement'], {queryParams: {account_id, account_name}});
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
