import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  status=true
  constructor() { }

  ngOnInit(){
  }
  
  editname(){
    console.log(123)
    if(this.status == true){
        this.status = false
    }else{
        this.status = true
    }
  }
  

}
