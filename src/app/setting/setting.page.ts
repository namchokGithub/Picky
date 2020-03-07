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

  async editname(){

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });


    // if(this.status == true){
    //     this.status = false
    // }else{
    //     this.status = true
    // }
  }


  successtoEdit(){

  }

}
