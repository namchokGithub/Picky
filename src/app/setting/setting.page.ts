import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  status=true
  name:string
  alertCtrl: AlertController
  constructor() { 
      this.name = 'Mhee'
  }

  ngOnInit(){
    
  }

  editname(){
    console.log(123)
    const confirm = this.alertCtrl.create({
      title:'การแก้ไข',
      message: 'ต้องการแก้ไขหรือไม่',
      buttons:[
        {
          text: 'ใช่',
          handler:() =>{
            console.log('กดปุ่มแก้ไข');
          }
        },
        {
          text: 'ไม่',
          handler:() =>{
            console.log('ยกเลิกการแก้ไขแก้ไข');
          }
        }
      ]
    })


    if(this.status == true){
        this.status = false
    }else{
        this.status = true
    }
  }

  successtoEdit(){

  }

}
