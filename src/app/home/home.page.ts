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
  private user_id;
  private user_session: any = [];
  private account_person: any = [];

  constructor(
    private menu: MenuController,
    private activatedRoute: ActivatedRoute,
    private user: UserService
  ) {}

  ngOnInit() {
    this.menu.enable(true,"menuSilde");
    this.load_session_user();
  }

  async load_session_user() {
    this.user_session = this.user.get_session_user();
    this.user_id = this.user_session.user_id
    await this.load_account()
  }

  load_account(){
    //this.account_person = this.accountPersonService.get_account_person()
  }
}
