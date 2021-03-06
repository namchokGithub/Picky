/**
 * @File : add.page.ts
 * service of add transactions
 */

import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController , ToastController, LoadingController} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService, transaction} from 'src/app/services/transaction.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})

export class AddPage implements OnInit {
  public account_id: string;
  public account_name: string;
  public type_category = '';
  public name_category = '';
  public cash = '';
  public date = '';
  public note = '';
  public user_session: any = [];

  transaction: transaction = {
    tran_account_id: '',
    tran_account: '',
    tran_amount: '',
    tran_category_name: '',
    tran_category_type: '',
    tran_date: '',
    tran_note: '',
    tran_user: ''
   };

  constructor(
              public nav: NavController,
              public modalController: ModalController,
              public activatedRoute: ActivatedRoute,
              public router: Router,
              public alertController: AlertController,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public userService: UserService,
              public transactionService: TransactionService,
              public accountService: AccountService
            ) { }

  // * @Function   : ngOnInit => รับค่าจากหน้า CategoryPage ที่ส่งมายังหน้า add
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  async ngOnInit() {
    this.name_category = null;
    this.activatedRoute.queryParamMap.subscribe(params => {
        this.type_category  = params.get('Type_category');
        this.name_category = params.get('name_category');
     });

    this.user_session =  await this.userService.get_session_user();
    this.account_id = this.accountService.get_session_account_id();
    this.account_name = this.accountService.get_session_account_name();
  }
  // ----------------------------------------------------------------------------------------------------------------- //


  // * @Function   : goCategoryPage => ไปยังหน้า CategoryPage
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  goCategoryPage() {
    this.router.navigate(['category'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //


  // * @Function   : back => ย้อนไปยังหน้า home
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  back() {
    this.router.navigate(['home'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //


  // * @Function   : confirm => ย้อนไปยังหน้า home
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  confirm() {
    this.router.navigate(['home'], { replaceUrl: true });
  }// ----------------------------------------------------------------------------------------------------------------- //


  // * @Function   : addtransaction => แสดงหน้าต่างข้อความ
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  async addtransaction() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }
  // ----------------------------------------------------------------------------------------------------------------- //


  // * @Function   : onSubmit => ส่งค่าจากที่ผู้ใช้กรอก บันทึกลงฐานข้อมูล
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  onSubmit() {
      console.log('ประเภท :' + this.type_category);
      console.log('ชื่อ :' + this.name_category);
      console.log('วันที่ :' + this.date);
      console.log('เพิ่มเติม :' + this.note);
      console.log('จำนวนเงิน :' + this.cash);

      this.transaction.tran_account = this.account_name;
      this.transaction.tran_account_id = this.account_id;
      this.transaction.tran_amount = this.cash;
      this.transaction.tran_category_name = this.name_category;
      this.transaction.tran_category_type = this.type_category;
      this.transaction.tran_date = this.date.toString().substring(0, 10);
      this.transaction.tran_note = this.note;
      this.transaction.tran_user = this.user_session.user_id;
      this.transactionService.add_transaction(this.transaction);
      console.log(this.transaction);
      this.router.navigate(['home'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //


  // * @Function   : validate => เช็คค่าหากไม่มีการกรอกข้อมูล จะทำการแสดงข้อความแจ้งเตือน
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  validate() {

    if (this.name_category == null) {
      this.showToast('กรุณาระบุประเภท');
    } else if (this.cash == '') {
      this.showToast('กรุณาระบุจำนวนเงิน');
    } else if (this.date == '') {
      this.showToast('กรุณาระบุวันที่');
    } else if (this.type_category == '') {
      this.showToast('กรุณาระบุประเภท');
    } else {
      this.onSubmit();
    }
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  // * @Function   : showToast
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
  // ----------------------------------------------------------------------------------------------------------------- //

}
