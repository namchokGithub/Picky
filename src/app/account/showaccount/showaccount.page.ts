import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { VirtualTimeScheduler } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
// import { AccountPersonService } from './../../services/account-person.service';
// import { AccountFamilyService } from './../../services/account-family.service';
// import { AccountBusinessService } from './../../services/account-business.service';
import { UserService } from './../../services/user.service';
@Component({
  selector: 'app-showaccount',
  templateUrl: './showaccount.page.html',
  styleUrls: ['./showaccount.page.scss'],
})

export class ShowaccountPage implements OnInit {

  private user_session: any = [];

  constructor(private menu: MenuController
            , public navCtrl: NavController
            , private router: Router
            , private activatedRoute: ActivatedRoute
            , private userService: UserService
          ) { }

  /*balance = ['1000','2000','3000']
  name_account = ['บัญชีส่วนตัว', 'บัญชีเงินฝาก', 'บัญชีเงินเก็บ'];
  type_account = ['ครอบครัว','องค์กร','ผู้ใช้ทั่วไป']
  user_member = [0,1,2,3]*/

  public Data = new Array();
  ngOnInit() {
    this.menu.enable(true, 'menuSilde');
   this.user_session = this.userService.get_session_user();
    console.log(this.user_session);

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
      //  for (let i = 0; i < data_account.length ; i++) {
      //   if (this.userlogin.user_id === data_account[i].user_id) {
      //     this.Data.push(data_account[i]);
      //   }
      //  }
  }

}
