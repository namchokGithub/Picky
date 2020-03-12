import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService, User } from 'src/app/services/user.service';

/* File Name : app.component.ts
  Author : Namchock 
  Description : แสดงแทบเมนูระบบ
  Date : -
  Update : 13-03-20 | Naruemon*/

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  // tslint:disable-next-line: variable-name
  private user_session: any;
  private name = '';
  public appPages = [
    { // ไปที่หน้าแรกของระบบ (Home)
      title: 'หน้าแรก',
      url: '/home',
      icon: 'home'
    },
    { // ไปที่หน้าทำธุรกรรม (Transactions)
      title: 'ธุรกรรม',
      url: '/list-transactions',
      icon: 'card'
    },
    { // ไปที่หน้าบัญชี (Account)
      title: 'บัญชี',
      url: '/showaccount',
      icon: 'person'
    },
    { // ไปที่หน้ารายงานบัญชี (Report)
      title: 'รายงาน',
      url: '/report',
      icon: 'bar-chart'
    },
    { // ไปที่หน้าการตั้งต่า (Setting)
      title: 'การตั้งค่า',
      url: '/setting', 
      icon: 'settings'
    },
    { // เมนูออกจากระบบ โดยกลับไปที่หน้า login
      title: 'ออกจากระบบ',
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
  /**
   * function : initializeApp
   * Name : 
   * 
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  /**
   * function : ngOnInit
   * Name : 
   * 
   */
  ngOnInit() {
    this.loadName();

    const path = window.location.pathname.split('home/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        page => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }
  /**
   * function : loadName
   * Name : 
   * โหลดชื่อผู้ใช้
   */
  loadName() {
    this.user_session = this.userService.get_session_user();
    this.name = this.user_session.user_name;
  }

  callpageAdd() {
    console.log('click');
  }
}
