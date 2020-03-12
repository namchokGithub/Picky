import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService, User } from 'src/app/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  // tslint:disable-next-line: variable-name
  private user_session: any;
  public name = '';
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
    this.loadName();

    const path = window.location.pathname.split('home/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        page => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }

  loadName() {
    this.user_session = this.userService.get_session_user();
    this.name = this.user_session.user_name;
  }

  callpageAdd() {
    console.log('click');
  }
}
