/**
 * @File : enterprisemanagement.page.ts
 * service of enterprise management
 */

import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AccountService, enterprise } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { ToastController , AlertController} from '@ionic/angular';

@Component({
  selector: 'app-enterprisemanagement',
  templateUrl: './enterprisemanagement.page.html',
  styleUrls: ['./enterprisemanagement.page.scss'],
})

export class EnterprisemanagementPage implements OnInit {

  public account_id: string;
  public account_name: string;
  public account: any = [];
  public user_session = [];

  constructor(  public router: Router, public activatedRoute: ActivatedRoute, public accountService: AccountService
              , public userService: UserService, public toastController: ToastController, public alertController: AlertController
              ) {}

  public sharename: string;
  public user_search: any = [];
  public db_user = [];

  public enterprise: enterprise = {
    id : '',
    account_balance : '',
    account_name : '',
    account_member : [],
    account_type : '',
    account_department : '',
  };

  async ngOnInit() {
    this.user_session = await this.userService.get_session_user();
    this.userService.get_user().subscribe(async res => {
      this.db_user = res;
    });
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.account_id  = params.get('account_id');
      this.account_name = params.get('account_name');
    });
    this.accountService.get_acount_enterprise_By_Id(this.account_id).subscribe(res => {
      this.account = res;
      console.log(this.account);
      this.setaccount();
    });
    this.sharename = '';
    // console.log(this.account_id);
  }

  /*
  Function : setaccount() | กำหนดค่าให้ Account
  Date : 2020-03-14
  */
  setaccount() {
    this.enterprise.id = this.account_id;
    this.enterprise.account_balance = this.account.account_balance;
    this.enterprise.account_name = this.account.account_name;
    this.enterprise.account_member = this.account.account_member;
    this.enterprise.account_type = this.account.account_type;
    this.enterprise.account_department = this.account.account_department;
    // console.log(this.enterprise);
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /*
  Function : searchusername() | ค้นหา user
  Date : 2020-03-14
  */
  searchusername() {
    this.user_search = this.db_user.find(user => user.user_id === this.sharename);
    if (this.user_search.user_id == this.sharename) {
      this.showToast('ค้นหาผู้ใช้พบ');
    }
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /*
  Function : back() | back to page show account
  Date : 2020-03-14
  */
  back() {
    this.router.navigate(['showaccount'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /*
  Function : showToast() | show toast
  Date : 2020-03-14
  */
  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /*
  Function : alert() | show alert
  Date : 2020-03-14
  */
  async alert() {
    const alert = await this.alertController.create({
      header: 'ยืนยัน',
      message: 'คุณต้องการยืนยันรายชื่อหรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Confirm Okay');
            this.enterprise.account_member.push(this.user_search);
            this.accountService.update_account_enteprise(this.enterprise);
          }
        }
      ]
    });

    await alert.present();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /*
  Function : alert() | show alert
  Date : 2020-03-14
  */
  // delete(accountId: string) {
  //   console.log(accountId);
  // }

}
