import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController } from "@ionic/angular";
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username: string = ""; 
  private password: string = "";

  constructor(
    public navCtrl: NavController
    ,private router: Router
    ,private menu: MenuController
    ,public alertController: AlertController
  ) {

  }

  ngOnInit() {
    this.loginMenu()
  }

  goHomePage(){
    this.router.navigateByUrl('home', { replaceUrl: true })
  }

  register(){
    this.router.navigate(['register'])
  }

  /**
   * loginMenu
   * Name: Komsan
   * 2020-03-10
   */
  async validate() {
    let check: Boolean = true

    if (this.username == "user" && this.password == "user") {
      this.goHomePage()
    }else {

      const alert = await this.alertController.create({
        header: 'แจ้งเตือน',
        message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
        buttons: ['ตกลง']
      });
  
      await alert.present();

      console.log('Incorrect username nad password')
    }

  }

  /**
   * loginMenu
   * Name: Phannita
   * 2020-03-10
   */
  loginMenu() {
    this.menu.enable(false, 'menuSilde');
  }

}