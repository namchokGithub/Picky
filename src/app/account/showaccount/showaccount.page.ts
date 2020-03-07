import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-showaccount',
  templateUrl: './showaccount.page.html',
  styleUrls: ['./showaccount.page.scss'],
})
export class ShowaccountPage implements OnInit {


  constructor(public navCtrl: NavController, private router: Router) { }

  Data = [
    'บัญชีส่วนตัว', 'บัญชีเงินฝาก', 'บัญชีเงินเก็บ'
  ];
  ngOnInit() {
  }

  openAddAccount() {
    console.log('Click');
    this.router.navigate(['addaccount']);
  }

  openSelectAccount() {

    console.log('Clcik');
    this.router.navigate(['home']);
  }

  selecet_account() {
    this.router.navigateByUrl('home', { replaceUrl: true });
  }


  openSetting() {
    console.log('Clcik');
    this.router.navigate(['familymanagement']);

  }

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
