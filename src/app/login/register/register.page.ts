import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
<<<<<<< HEAD
import { NavController, AlertController, MenuController, ToastController } from "@ionic/angular";
=======
import { NavController , AlertController} from "@ionic/angular";
>>>>>>> origin/kittisak
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
  private name: string = "";
  private username: string = "";
  private password: string = "";
  private confirmPassword: string = "";

  user_add: User = {
    id:'',
    user_name:'',
    user_id:'',
    user_password:'' 
  };

  user: User[] 


  constructor(
    private router: Router,
    private alertController:AlertController,
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
      this.back();
    }
  }
  
  check_regis(){
    if(this.user_add.user_name && this.user_add.user_id && this.user_add.user_password){
      if(this.user_add.user_password == this.ConfirmPassword){
        return true
      }else{
        this.Alert("confirm รหัสผ่านไม่ถูกต้อง")
        return false
      }
    }else{
      this.Alert("กรุณาระบุข้อมูลให้ครบถ้วน")
      return false
    }
  }

  validate() {
    
    if(this.user_add.user_name == "") {

      this.Toast('กรุณาใส่ชื่อ')
      console.log('กรุณาใส่ชื่อ')

    } else if(this.user_add.user_id == "") {

      this.Toast('กรุณาใส่ชื่อผู้ใช้งาน')
      console.log('กรุณาใส่ชื่อผู้ใช้งาน')

    } else if(this.user_add.user_password == "") {

      this.Toast('กรุณาใส่รหัสผ่าน')
      console.log('กรุณาใส่รหัสผ่าน')

    } else if(this.confirmPassword == "") {

      this.Toast('กรุณายืนยันรหัสผ่าน')
      console.log('กรุณายืนยันรหัสผ่าน')

    }else if(this.confirmPassword != this.user_add.user_password ) {

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
      color: 'dark'
      ,duration: 1000
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
      this.Alert("มีผู้ใช้ "+this.user+" อยู่ในระบบแล้ว")
      return false
    }
  }

  async Alert(massage:string) {
    const alert = await this.alertController.create({
      header: 'สมัครใช้บริการไม่สำเร็จ',
      subHeader: '',
      message: massage,
      buttons: ['OK']
    });
    await alert.present();
  }



  
}
