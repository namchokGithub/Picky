import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService,User } from 'src/app/services/user.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private user_name : String = ' ';
  private user_password : String = ' ';
  private user_id : String = ' ';
  private user_session :User[];
  constructor(private menu: MenuController,
    private activatedRoute: ActivatedRoute,
    private user :UserService) { }

  ngOnInit() {
    this.menu.enable(true, 'menuSilde');
    this.user_session = this.user.get_session_user()
    console.log(this.user_session)
  }

}
