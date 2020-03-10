
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from "@ionic/angular";
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private username: string = ""; 
  private password: string = "";

  constructor(
    public navCtrl: NavController
    ,private router: Router
    ,private menu: MenuController
  ) {

  }

  ngOnInit() {
    this.loginMenu()
  }

  goHomePage(){
    this.router.navigateByUrl('home', { replaceUrl: true })
  }

  register(){
    this.router.navigate(['register'])
  }

  async validate() {
    let check: Boolean = true

    if (this.username == "user" && this.password == "user") {
      this.goHomePage()
    }else {
      console.log('Incorrect username nad password')
    }

  }

  /**
   * loginMenu
   * Name: Namchok
   * 2020-03-10
   */
  loginMenu() {
    this.menu.enable(false, 'menuSilde');
  }

}
