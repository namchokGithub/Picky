import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private user_name : String = ' ';
  private user_password : String = ' ';
  private user_id : String = ' ';

  constructor(private menu: MenuController,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.menu.enable(true, 'menuSilde');



    console.log(this.user_name,' ',this.user_password,' ',this.user_id)
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.user_name  = params.get('user_name');
      this.user_password  = params.get('user_password');
      this.user_id  = params.get('user_id');
     
   });

  }

}
