import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { AccountService, person, family, enterprise} from './../../services/account.service';
@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.page.html',
  styleUrls: ['./addaccount.page.scss']
})
export class AddaccountPage implements OnInit {
  person: person = {
    account_balance: '',
    account_name: '',
    account_type: '',
    account_user_id: '',
    account_user_name: ''
  };

  // record_account: Record = {
  //   account_id: '',
  //   account_name: '',
  //   user_record: []
  // };
  family: family = {

    account_balance: '',
    account_name: '',
    account_member: [],
    account_type: '',

  };
  enterprise: enterprise = {
    account_balance: '',
    account_department: '',
    account_member: [],
    account_name: '',
    account_type: ''};

  private type: string;
  private user_session: any = [];
  private name_account: string;
  private department: string;
  constructor(
    public navCtrl: NavController,
    private router: Router,
    public alertController: AlertController,
    private userService: UserService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.loaduser();
    this.type = 'Personal';
  }

  back() {
    this.router.navigate(['showaccount'], { replaceUrl: true });
  }

  // Function : confirm กดปุ่มยืนยันเพิ่มบัญชี
  // name : Chatchalerm
  // Date : 2020-03-09
  async confirm() {
    const alert = await this.alertController.create({
      header: 'ยืนยันการเพิ่มบัญชีผู้ใช้?',
      message: 'คุณต้องการเพิ่มบัญชีประเภท ' + this.type + ' หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Confirm Okay');
            if (this.type == 'Personal') {
              this.add_account(this.type);
            }else if(this.type == 'Family'){
              this.add_account(this.type);
            }else if(this.type == 'Enterprise'){
              this.add_account(this.type);
            }

            

            this.router.navigate(['showaccount']);

          }
        }
      ]
    });

    await alert.present();
  }

  add_account(type:String){


      if(type == 'Personal'){

        this.person.account_balance = '0';
        this.person.account_name = this.name_account;
        this.person.account_type = 'Personal';
        this.person.account_user_id = this.user_session.user_id;
        this.person.account_user_name = this.user_session.user_name;
      
        this.accountService.add_account_person(this.person);
      }else if(type == 'Family'){
         this.family.account_balance = '0';
         this.family.account_name = this.name_account;
         this.family.account_member = [this.user_session];
         this.family.account_type = 'Family';

         this.accountService.add_account_family(this.family);
      }else if(type == 'Enterprise'){
        this.enterprise.account_balance = '0';
        this.enterprise.account_department = this.department;
        this.enterprise.account_member = [this.user_session];
        this.enterprise.account_name = this.name_account;
        this.enterprise.account_type = 'Enterprise';

        this.accountService.add_account_enterprise(this.enterprise);  
      }
  }

  loaduser() {
    this.user_session = this.userService.get_session_user();
    console.log(this.user_session);
  }

  get_last_id() {
    // this.accountPersonService.get_account_person().subscribe(res => {
    //   this.account = res[0];
    //   console.log(this.account);
    //   this.add_record();
    // });
  }

  add_record() {
    const date = new Date();
    console.log(
      date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear()
    );
    // this.record_account.account_id = this.account.id;
    // this.record_account.account_name = this.account.name_account;
    // this.record_account.user_record = [];

    // this.recordService.add_record(this.record_account);
  }
}
