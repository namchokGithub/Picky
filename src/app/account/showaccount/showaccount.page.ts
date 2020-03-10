import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { VirtualTimeScheduler } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-showaccount',
  templateUrl: './showaccount.page.html',
  styleUrls: ['./showaccount.page.scss'],
})
export class ShowaccountPage implements OnInit {


  constructor(public navCtrl: NavController, private router: Router , private activatedRoute: ActivatedRoute ) { }

  Data = [
    'บัญชีส่วนตัว', 'บัญชีเงินฝาก', 'บัญชีเงินเก็บ'
  ];
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      // this.type_account  = params.get('Type_Account')
      this.Data.push(params.get('Name_Account'))
   });
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
