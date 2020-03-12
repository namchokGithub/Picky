import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController , ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username = null;
  private password = null;
  private db_user: any = [];
  private userlogin: any = [];

  constructor(
    public navCtrl: NavController
    , private router: Router
    , private menu: MenuController
    , public alertController: AlertController
    , private UserService: UserService
    , private toastController: ToastController
    , public loadingController: LoadingController
    , public storage: Storage
  ) {

  }

  ngOnInit() {
    this.UserService.get_user().subscribe(async res => {
      // console.log(res);
      this.db_user = res;
    });
    this.loginMenu();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'รอสักครู่...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  /**
   * @param -
   * @name Namchok
   * @date 2020-3-12
   */
  selectAccount() {
    this.router.navigate(["showaccount"], { replaceUrl: true });
  }

  /**
   * @param -
   * @name Namchok
   * @date 2020-3-10
   */
  goToRegister() {
    this.router.navigate(["register"], { replaceUrl: true });
  }

  /**
   * validate เช็ค login userid && password
   * Name: Komsan tesana
   * 2020-03-10
   */
    async validate() {
      if (this.validate_login()) {
        await this.presentLoading();
        if (await this.check_login()) {
          this.selectAccount();
        }
        else {
          this.showToast('รหัสผู้ใช้งานไม่ถูกต้อง');
        }
      }
    }

  /**
   * validate_login
   * Name: Namchok
   * 2020-03-10
   */
    validate_login() {
      if ( this.username === '') {
        this.showToast('กรุณาใส่ชื่อผู้ใช้')
        console.log('false');
        return false;
      }else if ( this.password === '') {
        this.showToast('กรุณาใส่รหัสผ่าน')
        console.log('false');
        return false;
      }else {
        return true;
      }
    }

  /**
   * check_login
   * Name: Namchok
   * 2020-03-10
   */
    async check_login() {

      this.userlogin = this.db_user.find(user => user.user_id === this.username);

      if (this.userlogin.user_password === this.password) {
        console.log('true');
        return true;
      } else {
        console.log('false');
        return false;
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

    // * @Function   : showToast => แสดงข้อความแจ้งเตือน
    // * @Author     : Komsan Tesana
    // * @Create Date: 10/3/2563
    showToast(msg) {
        this.toastController.create({
            message: msg,
            duration: 3000,
            color: 'dark'
        }).then(toast => toast.present());
    }
}
