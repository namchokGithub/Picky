/**
 * @File : lofin.page.ts
 * service of login
 */

import { Component, OnInit } from '@angular/core';
import {
  NavController,
  MenuController,
  AlertController,
  ToastController,
  LoadingController
} from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {

  public username = null;
  public password = null;
  public db_user: any = [];
  public userlogin: any = [];

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public menu: MenuController,
    public alertController: AlertController,
    public UserService: UserService,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    
    this.UserService.clearSession()
    this.UserService.get_user().subscribe(async res => {
      this.db_user = res;
    });

    this.loginMenu();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /**
   * @param -
   * @name Namchok
   * @date 2020-3-10
   */
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'รอสักครู่...',
      duration: 500
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /**
   * @param -
   * @name Komsan
   * @date 2020-3-10
   */
  goHomePage() {
    this.router.navigate(['home'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /**
   * @param -
   * @name Namchok
   * @date 2020-3-12
   */
  selectAccount() {
    this.router.navigate(['showaccount'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /**
   * @param -
   * @name Namchok
   * @date 2020-3-10
   */
  goToRegister() {
    this.router.navigate(['register'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /**
   * validate เช็คlogin userid && password
   * Name: Komsan tesana
   * 2020-03-10
   */
  async validate() {
    await this.presentLoading();
    if (await this.check_login()) {
      await this.UserService.set_session_user(this.userlogin); // set user session
      await this.UserService.loginSession(this.userlogin); // set user session for storage offine
      console.log('login success');
      await this.selectAccount(); // Goto page select account
    } else {
      console.log('false');
      this.alertInput('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
    }
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /**
  * loginMenu
  * Name: Namchok
  * 2020-03-10
  */
  validate_login() {
    if (this.username == null) {
      this.showToast('กรุณาใส่ชื่อผู้ใช้');
      console.log('false');
      return false;
    } else if (this.password == null) {
      this.showToast('กรุณาใส่รหัสผ่าน');
      console.log('false');
      return false;
    } else {
      this.validate();
    }
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /**
   * loginMenu
   * Name: Namchok
   * 2020-03-10
   */
  async check_login() {
    this.userlogin = this.db_user.find(user =>  user.user_id === this.username);
    if (this.userlogin) {
      return true;
    } else {
      return false;
    }
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /**
   * loginMenu
   * Name: Phannita
   * 2020-03-10
   */
  loginMenu() {
    this.menu.enable(false, 'menuSilde');
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  // * @Function   : showToast => แสดงข้อความแจ้งเตือน
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  showToast(msg: any, color = 'dark') {
    this.toastController
      .create({
        message: msg,
        duration: 1000,
        color,
        animated: true,
        translucent: true
      })
      .then(toast => toast.present());
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /**
   * @param text
   * @author Namchok
   * @date 2020-03-10
   */
  async alertInput(text) {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: text,
      buttons: ['ตกลง']
    });
    await alert.present();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

}