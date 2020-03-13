import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController ,ToastController,LoadingController} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { TransactionService, transaction} from 'src/app/services/transaction.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  public type_category = ' ';
  public cash = ' ';
  public name_category = ' ';
  public date = ' ';
  public note = ' ';
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
              private nav: NavController,
              private modalController: ModalController,
              public activatedRoute: ActivatedRoute,
              private router: Router,
              public alertController: AlertController,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private userService: UserService,
              private transactionService: TransactionService
            ) { }

  // * @Function   : ngOnInit => รับค่าจากหน้า CategoryPage ที่ส่งมายังหน้า add
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  ngOnInit() {
     this.activatedRoute.queryParamMap.subscribe(params => {
        this.type_category  = params.get('Type_category');
        this.name_category = params.get('record_name');
     });

     this.user_session =  this.userService.get_session_user();

  }

  // * @Function   : goCategoryPage => ไปยังหน้า CategoryPage
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  goCategoryPage() {
    this.router.navigate(['category']);
  }

  // * @Function   : back => ย้อนไปยังหน้า home
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  back() {
    this.router.navigate(['home'], { replaceUrl: true });
  }

  confirm() {
    this.router.navigate(['home'], { replaceUrl: true });
  }

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

  // * @Function   : onSubmit => ส่งค่าจากที่ผู้ใช้กรอก บันทึกลงฐานข้อมูล
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  onSubmit() {
      console.log('ประเภท :' + this.type_category);
      console.log('ชื่อ :' + this.name_category);
      console.log('วันที่ :' + this.date);
      console.log('เพิ่มเติม :' + this.note);
      console.log('จำนวนเงิน :' + this.cash);
      console.log( this.name_category);
      console.log( this.type_category);
    

     
        // this.transaction.tran_account_id = 'ssss';
        // this.tran_account = '';
        // this.tran_amount = '';
        // this.tran_category_name = '';
        // this.tran_category_type = '';
        // this.tran_date = '';
        // this.tran_note = '';
        // this.tran_user = '';
     


      // this.router.navigate(['home']);
  }

  // * @Function   : validate => เช็คค่าหากไม่มีการกรอกข้อมูล จะทำการแสดงข้อความแจ้งเตือน
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  
}
