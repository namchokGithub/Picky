import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  status=true
  name:string
  public alertController: AlertController
  constructor() { 
      this.name = 'Mhee'
  }

  ngOnInit(){
    
  }

  editname(){
    console.log(123)
    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Subtitle',
        message: 'This is an alert message.',
        buttons: ['OK']
      })
  
      await alert.present();
    }


    // if(this.status == true){
    //     this.status = false
    // }else{
    //     this.status = true
    // }
  }

  successtoEdit(){

  }

}
