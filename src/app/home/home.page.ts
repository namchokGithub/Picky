import { Component, OnInit } from "@angular/core";
import {
  NavController,
  MenuController,
  AlertController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService, User } from "src/app/services/user.service";
import { from } from "rxjs";
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  private account_id:string;
  private account_name:string;
 
  private user_session: any = [];
  private account_person: any = [];

  constructor(
    private menu: MenuController,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private user: UserService
  ) {
    
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.account_id  = params.get('account_id')
      console.log(this.account_id)
      this.account_name = params.get('account_name')
      console.log(this.account_name)
   });

    this.menu.enable(true,"menuSilde");
    this.load_session_user();
  }

  async load_session_user() {
    this.user_session = this.user.get_session_user();
    
    await this.load_account()
  }

  load_account(){
    //this.account_person = this.accountPersonService.get_account_person()
  }

  add(){
    this.router.navigate(['add'], {queryParams: {account_id:this.account_id,account_name:this.account_name}});
  }
}
