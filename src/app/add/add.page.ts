import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController ,ToastController,LoadingController} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { RecordService, Record } from './../services/record.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  private type_category = ' ';
  private cash = ' ';
  private name_category = ' ';
  private date = ' ';
  private note = ' ';
  private account_id :string;
  private account_name:string;
  private userlogin: any = [];

  private record_array : Record = {
    account_id: '',
    account_name: 'Person',
    user_record : []
  };

  constructor(
              private nav: NavController,
              private modalController: ModalController,
              public activatedRoute: ActivatedRoute,
              private router: Router,
              public alertController: AlertController,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private recordService: RecordService,
              private userService: UserService
            ) { }

// * @Function   : ngOnInit => รับค่าจากหน้า CategoryPage ที่ส่งมายังหน้า add
// * @Author     : Komsan Tesana
// * @Create Date: 10/3/2563

  ngOnInit() {
     this.activatedRoute.queryParamMap.subscribe(params => {
        this.type_category  = params.get('Type_category');
        this.name_category = params.get('record_name');
     });

     this.userlogin =  this.userService.get_session_user();

    

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
      console.log(this.userlogin.user_id);
      console.log(this.userlogin.user_name);

      this.record_array.account_id = '1';
      this.record_array.account_name = 'Person';
      this.record_array.user_record  = [
        this.date,
        this.name_category,
        this.cash,
        this.note,
        this.type_category,
        this.userlogin.user_id,
        this.userlogin.user_name ]
        this.recordService.add_record(this.record_array);   
        this.router.navigate(['home']);
  }

// * @Function   : validate => เช็คค่าหากไม่มีการกรอกข้อมูล จะทำการแสดงข้อความแจ้งเตือน
// * @Author     : Komsan Tesana
// * @Create Date: 10/3/2563

  validate(){

      if(this.type_category == ' ' ){

        console.log('กรุณาระบุประเภทรายรับ-รายจ่าย');
      } else if(this.cash == ' '){

        this.showToast('กรุณาระบุจำนวนเงิน');

      } else if(this.date == ' '){

        this.showToast('กรุณาระบุวันที่');
      } else {
          this.onSubmit();
      }
  }

// * @Function   : showToast => แสดงข้อความแจ้งเตือน
// * @Author     : Komsan Tesana
// * @Create Date: 10/3/2563
  showToast(msg) {
    this.toastController.create({
      message: msg,
      duration: 3000
    }).then(toast => toast.present());
  }
}
