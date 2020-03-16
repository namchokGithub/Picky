import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { VirtualTimeScheduler } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from 'src/app/services/user.service';

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
    private userService:UserService,
    private accountService: AccountService,
    private loadingController: LoadingController
  ) {
    
  }

  ngOnInit() {
    this.menu.enable(false, 'menuSilde');
    this.session_user();
    this.get_account();

  }

  session_user() {
    this.session = this.userService.get_session_user();
    this.name = this.session['user_name'];
    // console.log(this.session["user_name"]);
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

      // console.log(this.account_enterprise);
      // console.log(this.account_family);
      // console.log(this.account_person);
      // console.log('get_person_account_success');
    });

  }
  /* ไปสู่หน้า Add Account */
 async openAddAccount() {
    console.log('Click');
  
    while(this.account_person.length > 0){
      this.account_person.pop()
      console.log(this.account_person)
    }

    await this.router.navigate(['addaccount']);
  }

  /**
   * @Name Naerumon
   * เลือก Account ไปสู่หน้า Home
   */
  selecet_account(account_id, account_name) {
    this.presentLoading();
    this.accountService.set_session_account(account_id, account_name)
    this.router.navigate(['home']);
  }

  gotomanagementFamily(account_id, account_name) {
    this.presentLoading();
    this.router.navigate(['familymanagement'], {queryParams: {account_id: account_id, account_name: account_name}});
  }

  gotomanagementEnterprise(account_id, account_name) {
    this.presentLoading();
    this.router.navigate(['enterprisemanagement'], {queryParams: {account_id: account_id, account_name: account_name}});
  }

  removeAccount(id) {
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
