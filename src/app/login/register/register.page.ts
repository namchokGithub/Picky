import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'
import { NavController } from "@ionic/angular";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private name: string = "";
  private username: string = "";
  private password: string = "";
  private ConfirmPassword: string = "";

  constructor(public navCtrl: NavController,private router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['login'])
  }

}


