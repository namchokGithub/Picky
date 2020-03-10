import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { NavController, AlertController, MenuController } from "@ionic/angular";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private name: string = "";
  private username: string = "";
  private password: string = "";
  private confirmPassword: string = "";

  constructor(
    public navCtrl: NavController
    ,private router: Router
    ,private menu: MenuController
    ,public alertController: AlertController
    ) { }

  ngOnInit() {
    this.menu.enable(false, 'menuSilde');
  }

  validate() {
    
    if(this.name == "") {
      this.alertInput('กรุณาใส่ชื่อ')
      console.log('กรุณาใส่ชื่อ')
    } else if(this.username == "") {
      this.alertInput('กรุณาใส่ชื่อผู้ใช้งาน')
      console.log('กรุณาใส่ชื่อผู้ใช้งาน')
    } else if(this.password == "") {
      this.alertInput('กรุณาใส่รหัสผ่าน')
      console.log('กรุณาใส่รหัสผ่าน')
    } else if(this.confirmPassword == "") {
      this.alertInput('กรุณายืนยันรหัสผ่าน')
      console.log('กรุณายืนยันรหัสผ่าน')
    }else if(this.confirmPassword != this.password ) {
      this.alertInput('รหัสผ่านไม่ตรงกัน')
      console.log('รหัสผ่านไม่ตรงกัน')
    }
    
  }

  async alertInput(text) {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: text,
      buttons: ['ตกลง']
    });

    await alert.present();
  }

  backToLogin() {
    this.router.navigate(['login'], { replaceUrl: true })
  }

}