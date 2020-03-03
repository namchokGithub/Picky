
import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  private username: string = "";
  private password: string = "";

  constructor(public navCtrl: NavController,private router: Router) { }

  ngOnInit() {
  }

  goHomePage(){

    this.router.navigate(['home'])
  }
  register(){

    this.router.navigate(['register'])

  }

  async validate() {
    let check: Boolean = true

    if (this.username != "" && this.password != "") {

    }
  }
}
