import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import {
  NavController,
  AlertController,
  MenuController,
  ToastController
} from "@ionic/angular";
import { map, count } from "rxjs/operators";
import { UserService, User } from "src/app/services/user.service";
@Component({
  selector: "app-register", // เป็นส่วนที่เชื่อมต่อ
  templateUrl: "./register.page.html", //เป็นส่วนที่เชื่อมต่อ
  styleUrls: ["./register.page.scss"] //เป็นส่วนที่เชื่อมต่อ
})

// ไปคอมเม้นมาทุกส่วน
export class RegisterPage implements OnInit {
  private confirmPassword: string = ""; // ประกาศตัวเเปร confirmPassword เป็น string

  user_add: User = {
    //ฟังก์ชันการทำงานของการเพิ่มบัญชีผู้ใช้
    user_name: "", //class ของ user
    user_id: "", //
    user_password: "" //
  };

  user: User[];

  constructor(
    private router: Router, //
    private alertController: AlertController, //
    private userservice: UserService, //
    public navCtrl: NavController, //
    private menu: MenuController, //
    public toastController: ToastController //
  ) {}

  ngOnInit() {

    this.menu.enable(false, "menuSilde");
    this.userservice.get_user().subscribe(res => {
      console.log(res);
      this.user = res;
    });
    
  }

  back() {
    this.router.navigate(["login"]);
  }

  validate() {
    if (this.user_add.user_name == "") {
      this.Toast("กรุณาใส่ชื่อ");
      console.log("กรุณาใส่ชื่อ");
    } else if (this.user_add.user_id == "") {
      this.Toast("กรุณาใส่ชื่อผู้ใช้งาน");
      console.log("กรุณาใส่ชื่อผู้ใช้งาน");
    } else if (this.user_add.user_password == "") {
      this.Toast("กรุณาใส่รหัสผ่าน");
      console.log("กรุณาใส่รหัสผ่าน");
    } else if (this.confirmPassword == "") {
      this.Toast("กรุณายืนยันรหัสผ่าน");
      console.log("กรุณายืนยันรหัสผ่าน");
    } else if (this.confirmPassword != this.user_add.user_password) {
      this.Toast("รหัสผ่านไม่ตรงกัน");
      console.log("รหัสผ่านไม่ตรงกัน");
    } else {
      this.userservice.add_user(this.user_add);
      this.confirm();
      
    }
  }

  /**
   * @param text
   * @author Namchok
   * @date 2020-03-10
   */
  async alertInput(text) {
    const alert = await this.alertController.create({
      header: "แจ้งเตือน",
      message: text,
      buttons: ["ตกลง"]
    });

    await alert.present();
  }

  backToLogin() {
    this.router.navigate(["login"], { replaceUrl: true });
  }

  async Toast(text) {
    const toast = await this.toastController.create({
      message: text,
      color: "dark",
      duration: 1000,
      position: "bottom",
      cssClass: "toast-message-color"
    });
    toast.present();
  }


  // Function : confirm กดปุ่มยืนยันเพิ่มบัญชี
  // name : Chatchalerm
  // Date : 2020-03-09
  async confirm() {
    const alert = await this.alertController.create({
      header: 'ยืนยันการสมัครสมาชิกหรือไม่?',
      message: 'คุณต้องการสมัครสมาชิก ชื่อผู้ใช้ ' + this.user_add.user_name + ' หรือไม่?',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
           
            this.back();
          }
          
        }
        
      ]
      
    });
    await alert.present();
  }
  
}
