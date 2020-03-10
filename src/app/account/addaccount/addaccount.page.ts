import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NavController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { UserService, User } from "src/app/services/user.service";
import {
  AccountPersonService,
  Person
} from "src/app/services/account-person.service";
import { RecordService, Record } from "src/app/services/record.service";
@Component({
  selector: "app-addaccount",
  templateUrl: "./addaccount.page.html",
  styleUrls: ["./addaccount.page.scss"]
})
export class AddaccountPage implements OnInit {
  person_account: Person = {
    balance: 0,
    name_account: "",
    user_id: "",
    user_name: ""
  };

  record_account: Record = {
    account_id: "",
    account_name: "",
    user_record: []
  };

  private type: string;
  private user_session: any = [];
  private account: any = [];
  private name_account: string;
  constructor(
    public navCtrl: NavController,
    private router: Router,
    public alertController: AlertController,
    private userService: UserService,
    private accountPersonService: AccountPersonService,
    private recordService: RecordService
  ) {}

  ngOnInit() {
    this.loaduser();
  }

  back() {
    this.router.navigate(["showaccount"], { replaceUrl: true });
  }

  // Function : confirm กดปุ่มยืนยันเพิ่มบัญชี
  // name : Chatchalerm
  // Date : 2020-03-09
  async confirm() {
    const alert = await this.alertController.create({
      header: "ยืนยันการเพิ่มบัญชีผู้ใช้?",
      message: "คุณต้องการเพิ่มบัญชีประเภท " + this.type + " หรือไม่?",
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "ยืนยัน",
          handler: () => {
            console.log("Confirm Okay");
            this.router.navigate(["showaccount"]);
            if (this.type == "Personal") {
                this.add_account()
            }
          }
        }
      ]
    });

    await alert.present();
  }

  add_account() {
    this.person_account.name_account = this.name_account;
    this.person_account.user_id = this.user_session.user_id;
    this.person_account.user_name = this.user_session.user_name;
    this.accountPersonService.add_account_person(this.person_account);
    this.get_last_id();
  }
  loaduser() {
    this.user_session = this.userService.get_session_user();
    console.log(this.user_session);
  }

  get_last_id() {
    this.accountPersonService.get_account_person().subscribe(res => {
      this.account = res[0];
      console.log(this.account);
      this.add_record();
    });
  }

  add_record() {
    const date = new Date();
    console.log(
      date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear()
    );
    this.record_account.account_id = this.account.id;
    this.record_account.account_name = this.account.name_account;
    this.record_account.user_record = [];

    this.recordService.add_record(this.record_account);
  }
}
