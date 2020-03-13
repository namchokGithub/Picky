import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { VirtualTimeScheduler } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-showaccount',
  templateUrl: './showaccount.page.html',
  styleUrls: ['./showaccount.page.scss'],
})

export class ShowaccountPage implements OnInit {


  constructor(private menu: MenuController
            , public navCtrl: NavController
            , private router: Router
            , private activatedRoute: ActivatedRoute ) { }

  /*balance = ['1000','2000','3000']
  name_account = ['บัญชีส่วนตัว', 'บัญชีเงินฝาก', 'บัญชีเงินเก็บ'];
  type_account = ['ครอบครัว','องค์กร','ผู้ใช้ทั่วไป']
  user_member = [0,1,2,3]*/

  Data = [
    'บัญชีส่วนตัว', 'บัญชีเงินฝาก', 'บัญชีเงินเก็บ'];

  ngOnInit() {
    this.menu.enable(true, 'menuSilde');
  }

  /**
   * Name: Naruemon
   *ไปสู่หน้า Add Account 
  */ 
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

  /**
   * Name: Naruemon
   * ไปสู่หน้า Setting */
  openSetting() {
    console.log('Clcik');
    this.router.navigate(['familymanagement']);

  }
  /**
   * Name: Naruemon
   * ลบ Account บัญชีออก */
  removeAccount(data) {
    const index = this.Data.indexOf(data);

    if (index > -1) {
      this.Data.splice(index, 1);
    }
  }

  gotomanagementFamily() {
    console.log('gotomanagementFamily');
  }

}
