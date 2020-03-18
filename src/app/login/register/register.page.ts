/**
 * @File : register.page.ts
 * service of register
 */

import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import {
  NavController, // เป็นการควบคุบการพาไป 
  AlertController,//เป็นฟังชั่น text การเเจ้งเตือน ที่กดตกลงหรือยกเลือก comfirm
  MenuController,//เป็นตัวเมนูบาร์
  ToastController //เป็นการเเจ้งเตือน ให้ทราบ
} from "@ionic/angular";
import { map, count } from "rxjs/operators"; //map เป็นการจัดข้อมูล count คือการนับจำนวน
import { UserService, User } from "src/app/services/user.service"; //UserService คือ เซอร์วิสการเข้าใช้งานของ user ส่วน user คือตัวเเปรของเซอร์วิส user
@Component({
  selector: "app-register", // เป็นส่วนที่เชื่อมต่อ
  templateUrl: "./register.page.html", //เป็นส่วนที่เชื่อมต่อ
  styleUrls: ["./register.page.scss"] //เป็นส่วนที่เชื่อมต่อ
})

// ไปคอมเม้นมาทุกส่วน
export class RegisterPage implements OnInit {
  public confirmPassword: string = ""; // ประกาศตัวเเปร confirmPassword เป็น string

  user_add: User = {//เป็นตัวเเปรแบบ obj ที่เก็บค่าของผู้ใช้ใน user
    user_name: "", //เป็นตัวเเปรชื่อผู้ใช้
    user_id: "", // เป็นตัวเเปรการเก็บid ของuser
    user_password: "" // เป็นตัวเเปรการเก็บpassword ของuser
  };

  user: User[]; //เป็นตัวเเปร array ที่เก็บค่าการใช้งานของ user

  constructor(
    public router: Router, // เป็นการประกาศตัวเเปร ของclass Router เป็นตัวนำทางว่าเราจะไปยังอะไร
    public alertController: AlertController, //เป็นการประกาศตัวเเปร ของclass AlertController
    public userservice: UserService, //เป็นการประกาศตัวเเปร ของclass UserService
    public navCtrl: NavController, //เป็นการประกาศตัวเเปร ของclass NavController
    public menu: MenuController, //เป็นการประกาศตัวเเปร ของclass MenuController
    public toastController: ToastController //เป็นการประกาศตัวเเปร ของclass ToastController
  ) {}

  ngOnInit() { //เป็นฟังก์ชั่นที่ถูกเรียกใช้ทันทีเป็นอันดับเเรก

    this.menu.enable(false, "menuSilde");//เป็นการสั่งปิดการทำงานของตัวเมนูด้านข้าง 
    this.userservice.get_user().subscribe(res => {//เป็นการget ค่าของ user ออกมาใช้งานโดยผ่าน userservice
      console.log(res);//ไว้ดูการ return ค่าอะไรออกมา
      this.user = res;//เป็นการเก็บค่าไปยังตัวเเปร user
    });
    
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  back() {// การกลับไปยังหน้า login
    this.router.navigate(["login"]);// เป็นการเรียนใช้ router ให้กลับมายังที่หน้า login
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  validate() {//เป็นฟังก์ชั่นการตรวจสอบ 
    if (this.user_add.user_name == "") {// ถ้ามันเท่ากับช่องว่าง จะมีการเเสดงวว่า "กรุณาใส่ชื่อ"
      this.Toast("กรุณาใส่ชื่อ");// toast จะเป็นคำสั่งการเเจ้งเตือนให้ "กรุณาใส่ชื่อ"
      console.log("กรุณาใส่ชื่อ");//  ไว้ดูการ return ค่าอะไรออกมา 
    } else if (this.user_add.user_id == "") {//ถ้ามันเท่ากับช่องว่าง จะมีการเเสดงวว่า "กรุณาใส่ชื่อผู้ใช้งาน"
      this.Toast("กรุณาใส่ชื่อผู้ใช้งาน");//toast จะเป็นคำสั่งการเเจ้งเตือนให้ "กรุณาใส่ชื่อผู้ใช้งาน"
      console.log("กรุณาใส่ชื่อผู้ใช้งาน");//ไว้ดูการ return ค่าอะไรออกมา 
    } else if (this.user_add.user_password == "") {//ถ้ามันเท่ากับช่องว่าง จะมีการเเสดงวว่า "กรุณาใส่รหัสผ่าน"
      this.Toast("กรุณาใส่รหัสผ่าน");//toast จะเป็นคำสั่งการเเจ้งเตือนให้ "กรุณาใส่รหัสผ่าน"
      console.log("กรุณาใส่รหัสผ่าน");//ไว้ดูการ return ค่าอะไรออกมา 
    } else if (this.confirmPassword == "") {//ถ้ามันเท่ากับช่องว่าง จะมีการเเสดงวว่า "กรุณายืนยันรหัสผ่าน"
      this.Toast("กรุณายืนยันรหัสผ่าน");//toast จะเป็นคำสั่งการเเจ้งเตือนให้ "กรุณายืนยันรหัสผ่าน"
      console.log("กรุณายืนยันรหัสผ่าน");//ไว้ดูการ return ค่าอะไรออกมา 
    } else if (this.confirmPassword != this.user_add.user_password) {// ถ้าconfirmPassword ไม่ตรงกับ Passwoed จะมีการเเสดงวว่า "รหัสผ่านไม่ตรงกัน"
      this.Toast("รหัสผ่านไม่ตรงกัน");//toast จะเป็นคำสั่งการเเจ้งเตือนให้ "รหัสผ่านไม่ตรงกัน"
      console.log("รหัสผ่านไม่ตรงกัน");//ไว้ดูการ return ค่าอะไรออกมา 
    } else {//
      this.userservice.add_user(this.user_add);// เป็นการ add ของทั้งหมดที่user ทำการสมัคร
      this.confirm();// กด comfrim
    }
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  /**
   * @param text
   * @author Namchok
   * @date 2020-03-10
   */
  async alertInput(text) { //เป็นการเเจ้งเตือนข้อความ
    const alert = await this.alertController.create({
      header: "แจ้งเตือน",
      message: text,
      buttons: ["ตกลง"]
    });

    await alert.present();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  backToLogin() {
    this.router.navigate(["login"], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

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
  // ----------------------------------------------------------------------------------------------------------------- //

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
  // ----------------------------------------------------------------------------------------------------------------- //
  
}
