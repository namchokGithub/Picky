import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;

  private user_name = ' ';
  private user_password = ' ';
  private user_id = ' ';

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
    public activatedRoute: ActivatedRoute
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

    this.activatedRoute.queryParamMap.subscribe(params => {
      this.user_name  = params.get('user_name');
      this.user_password  = params.get('user_password');
      this.user_id  = params.get('user_id');

      console.log(this.user_name);
      console.log(this.user_password);
      console.log(this.user_id);
   });

    const path = window.location.pathname.split('home/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  callpageAdd() {
    console.log('click');
  }
}
