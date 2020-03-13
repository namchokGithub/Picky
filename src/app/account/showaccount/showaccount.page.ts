import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { VirtualTimeScheduler } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountPersonService } from './../../services/account-person.service';
import { AccountFamilyService } from './../../services/account-family.service';
import { AccountBusinessService } from './../../services/account-business.service';
import { UserService } from './../../services/user.service';
@Component({
  selector: 'app-showaccount',
  templateUrl: './showaccount.page.html',
  styleUrls: ['./showaccount.page.scss'],
})

export class ShowaccountPage implements OnInit {

  public userlogin: any = [];

  constructor(public navCtrl: NavController,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private accountPersonService: AccountPersonService,
              private accountFamilyService: AccountFamilyService,
              private accountBusinessService: AccountBusinessService,
              private userService: UserService) { }

  /*balance = ['1000','2000','3000']
  name_account = ['บัญชีส่วนตัว', 'บัญชีเงินฝาก', 'บัญชีเงินเก็บ'];
  type_account = ['ครอบครัว','องค์กร','ผู้ใช้ทั่วไป']
  user_member = [0,1,2,3]*/

  public Data = new Array();
  ngOnInit() {
    this.userlogin = this.userService.get_session_user();
    console.log(this.userlogin);
    this.accountPersonService.get_account_person().subscribe(async res => {
      this.check_account_person(res);
    });

    this.accountFamilyService.get_account_family().subscribe(async res => {
      this.check_account_family(res);
    });
    this.accountBusinessService.get_account_business().subscribe(async res => {
      this.check_account_business(res);
    });

  }
  /* ไปสู่หน้า Add Account */
  openAddAccount() {
    console.log('Click');
    this.router.navigate(['addaccount']);
  }

  /**
   * @Name Naerumon
   * เลือก Account ไปสู่หน้า Home
   */
  selecet_account() {
    this.router.navigateByUrl('home', { replaceUrl: true });
  }

  /*ไปสู่หน้า Setting */
  openSetting() {
    console.log('Clcik');
    this.router.navigate(['familymanagement']);

  }
  /* ลบ Account บัญชีออก */
  removeAccount(data) {
    console.log(data);
  }

  gotomanagementFamily() {
    console.log('gotomanagementFamily');
  }

  check_account_person(data_account) {
       // tslint:disable-next-line: prefer-for-of
       for (let i = 0; i < data_account.length ; i++) {
        if (this.userlogin.user_id === data_account[i].user_id) {
          this.Data.push(data_account[i]);
        }
       }
  }

  check_account_family(data_account) {
  }

  check_account_business(data_account) {
  }

}
