import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.page.html',
  styleUrls: ['./addaccount.page.scss'],
})
export class AddaccountPage implements OnInit {

  private  nameaccount: string = "";
 
  constructor(public navCtrl: NavController,private router: Router) { }

  ngOnInit() {
  }

  back(){

    this.router.navigate(['showaccount'])
  }
  
}
