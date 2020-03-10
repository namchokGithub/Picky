import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController ,ToastController } from "@ionic/angular";
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username = null 
  private password = null
  private db_user : any = [];

  constructor(
    public navCtrl: NavController
    ,private router: Router
    ,private menu: MenuController
    ,public alertController: AlertController
    ,private UserService: UserService
    ,private toastController: ToastController
  ) {

  }

  ngOnInit() {
    this.UserService.get_user().subscribe(async res => {
      console.log(res);

      this.db_user = res;
      
     
    });

    this.loginMenu()


  }

  goHomePage(user_name:string,user_password:string,user_id:string){
   
    this.router.navigate(['app'], {queryParams: {user_name:user_name,user_password:user_password,user_id:user_id}});
    this.router.navigate(['home'], {queryParams: {user_name:user_name,user_password:user_password,user_id:user_id}});
  }

  register(){
    this.router.navigate(['register'])
  }

  /**
   * validate เช็คlogin userid && password
   * Name: Komsan tesana
   * 2020-03-10
   */
    validate() {

        for (let i = 0; i <  this.db_user.length ; i++) {

            if(this.username == this.db_user[i].user_id) {

                if(this.password == this.db_user[i].user_password){
                    this.showToast('เข้าสู่ระบบสำเร็จ')
                    this.goHomePage(this.db_user[i].user_name,this.db_user[i].user_password,this.db_user[i].user_id);
                }else if(this.password == null || this.password != this.db_user[i].user_password){
                    this.showToast('รหัสผู้ใช้งานไม่ถูกต้อง')
                }
                    
            } else if(this.username == null){
                this.showToast('ชื่อผู้ใช้งานไม่ถูกต้อง')
            } else if(this.username != this.db_user[i].user_id){
                if(this.password == null){
                this.showToast('รหัสผู้ใช้งานไม่ถูกต้อง')
                }
                else if(this.password != this.db_user[i].user_password){
                this.showToast('ไม่พบข้อมูลผู้ใช้งานอยู่ในระบบ')
                }
            }
            

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