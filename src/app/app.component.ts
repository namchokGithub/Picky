import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from '../app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  private nametest = '';
  private user_name : String = ' ';
  private user_password : String = ' ';
  private user_id : String = ' ';
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Transactions',
      url: '/list-transactions',
      icon: 'card'
    },
    {
      title: 'Account',
      url: '/showaccount',
      icon: 'person'
    },
    {
      title: 'Report',
      url: '/report',
      icon: 'bar-chart'
    },
    {
      title: 'Setting',
      url: '/setting',
      icon: 'settings'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public activatedRoute: ActivatedRoute,
    public userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

      this.load();

      const path = window.location.pathname.split('home/')[1];
      if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
       }
  }

  load() {
    this.nametest = this.userService.get_user_name();
    console.log(this.nametest)
  }


  loadName(){
    if (this.userService.get_user_name() != 'Test') {
      this.nametest = this.userService.get_user_name();
      console.log(this.nametest);

    }else{

    }
  }

  callpageAdd() {
    console.log('click');
  }
}
