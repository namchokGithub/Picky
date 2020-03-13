import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController ,ToastController,LoadingController} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


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
  public userlogin: any = [];

  

  constructor(
              private nav: NavController,
              private modalController: ModalController,
              public activatedRoute: ActivatedRoute,
              private router: Router,
              public alertController: AlertController,
              private loadingController: LoadingController,
              private toastController: ToastController,
              
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
  

  // * @Function   : validate => เช็คค่าหากไม่มีการกรอกข้อมูล จะทำการแสดงข้อความแจ้งเตือน
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  
}
