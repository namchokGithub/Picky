import { Component, OnInit } from '@angular/core';
import {NavController, MenuController, AlertController , ToastController, LoadingController } from '@ionic/angular';
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
     private activatedRoute: ActivatedRoute,
     public alertController: AlertController,
     private toastController: ToastController,
     public loadingController: LoadingController) { }

  ngOnInit() {
    this.menu.enable(true, 'menuSilde');
    this.activatedRoute.queryParamMap.subscribe(params => {
     this.user_name  = params.get('user_name');
      this.user_password  = params.get('user_password');
      this.user_id  = params.get('user_id');  
   });


   
  }

}
