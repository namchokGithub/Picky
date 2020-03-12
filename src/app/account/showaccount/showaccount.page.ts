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

  private userlogin: any = [];
  
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

  private Data: any [];
  ngOnInit() {
    this.userlogin = this.userService.get_session_user();

      console.log(this.userlogin);
    this.accountPersonService.get_account_person().subscribe(async res => {
      this.check_account(res);
    });

    this.accountFamilyService.get_account_family().subscribe(async res => {
      this.check_account(res);
    });
    this.accountBusinessService.get_account_business().subscribe(async res => {
      this.check_account(res);
    });

    
    
  }
  /* ไปสู่หน้า Add Account */
  openAddAccount() {
    console.log('Click');
    this.router.navigate(['addaccount']);
  }

  /* เลือก Account ไปสู่หน้า Home */
  selecet_account() {
    console.log('Clcik');
    this.router.navigateByUrl('home', { replaceUrl: true });
  }

  /*ไปสู่หน้า Setting */
  openSetting() {
    console.log('Clcik');
    this.router.navigate(['familymanagement']);

  }
  /* ลบ Account บัญชีออก */
  removeAccount(data) {
    const index = this.Data.indexOf(data);

    if (index > -1) {
      this.Data.splice(index, 1);
    }
  }

  gotomanagementFamily() {
    console.log('gotomanagementFamily');
  }

  check_account(data_account){ 

  }

}
