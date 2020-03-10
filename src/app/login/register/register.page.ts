import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NavController, AlertController, MenuController, ToastController } from "@ionic/angular";
import { map, count } from "rxjs/operators";
import { UserService, User } from "src/app/services/user.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})

// ไปคอมเม้นมาทุกส่วน

export class RegisterPage implements OnInit {
  
  private ConfirmPassword: string = "";
  user_add:User = {
    user_name:'',
    user_id:'',
    user_password:'' 
  };
  private name: string = "";
  private username: string = "";
  private password: string = "";
  private confirmPassword: string = "";
  user: User[]

  constructor(
    private router: Router,
    private userservice: UserService
    ,public navCtrl: NavController
    ,private menu: MenuController
    ,public alertController: AlertController
    ,public toastController: ToastController
  ) {}

  ngOnInit() {
    this.menu.enable(false, 'menuSilde');
    this.userservice.get_user().subscribe(res => {
      console.log(res);
      this.user = res;
    });
  }

  back() {
    this.router.navigate(["login"]);
  }

  confirm_regis() {
    
    if(this.check_username() && this.check_regis()){
      this.userservice.add_user(this.user_add)
      console.log(123)
    }else{
      console.log(234)
    }
  }
  
  check_regis(){
    if(this.user_add.user_name && this.user_add.user_id && this.user_add.user_password){
      if(this.user_add.user_password == this.ConfirmPassword){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }

  validate() {
    
    if(this.name == "") {
      this.Toast('กรุณาใส่ชื่อ')
      console.log('กรุณาใส่ชื่อ')
    } else if(this.username == "") {
      this.Toast('กรุณาใส่ชื่อผู้ใช้งาน')
      console.log('กรุณาใส่ชื่อผู้ใช้งาน')
    } else if(this.password == "") {
      this.Toast('กรุณาใส่รหัสผ่าน')
      console.log('กรุณาใส่รหัสผ่าน')
    } else if(this.confirmPassword == "") {
      this.Toast('กรุณายืนยันรหัสผ่าน')
      console.log('กรุณายืนยันรหัสผ่าน')
    }else if(this.confirmPassword != this.password ) {
      this.Toast('รหัสผ่านไม่ตรงกัน')
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

  async Toast(text){
      const toast = await this.toastController.create({
      message: text,
      duration: 1000
      ,position: 'bottom'
      ,cssClass: 'toast-message-color'
    });

       toast.present();

  }
  

  check_username() {
    const founc = this.user.find(user => user.user_id === this.user_add.user_id)
    if(!founc){
      return true
    }else{
      return false
    }
  }
}
