import { CategoryPage } from './category/category.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController ,ToastController,LoadingController} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { RecordService } from './../services/record.service'


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  
  private type_category :string = " "
  private cash :string = " "
  private name_category :string = " "
  private date :string = " "
  private note :string = " "

  constructor(private nav: NavController,
              private modalController: ModalController, 
              public activatedRoute: ActivatedRoute,
              private router: Router,
              public alertController: AlertController,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private RecordService: RecordService) { }

// * @Function   : ngOnInit => รับค่าจากหน้า CategoryPage ที่ส่งมายังหน้า add
// * @Author     : Komsan Tesana
// * @Create Date: 10/3/2563

  ngOnInit() {
     this.activatedRoute.queryParamMap.subscribe(params => {
        this.type_category  = params.get('Type_category')
        this.name_category = params.get('record_name')
     });
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

  onSubmit(){

  
      console.log("ประเภท :"+this.type_category);
      console.log("ชื่อ :"+this.name_category);
      console.log("วันที่ :"+this.date);
      console.log("เพิ่มเติม :"+this.note);
      console.log("จำนวนเงิน :"+this.cash);


  }

// * @Function   : validate => เช็คค่าหากไม่มีการกรอกข้อมูล จะทำการแสดงข้อความแจ้งเตือน
// * @Author     : Komsan Tesana
// * @Create Date: 10/3/2563

  validate(){

      if(this.type_category == " " ){

        console.log("กรุณาระบุประเภทรายรับ-รายจ่าย")
      }
      else if(this.cash == " "){
       
        this.showToast('กรุณาระบุจำนวนเงิน')

      }else if(this.date == " "){

        this.showToast('กรุณาระบุวันที่')
      }else{
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
