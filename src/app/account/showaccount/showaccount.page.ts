import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-showaccount',
  templateUrl: './showaccount.page.html',
  styleUrls: ['./showaccount.page.scss'],
})
export class ShowaccountPage implements OnInit {


  constructor(public navCtrl: NavController, private router: Router) { }

  ngOnInit() {
  }

  openAddAccount() {
    console.log('Clcik');
    this.router.navigate(['addaccount']);
  }

  unread(item) {
    console.log('test ' + item);
  }

  selecet_account() {
    this.router.navigateByUrl('home', { replaceUrl: true });
  }

  gotopagefamilymanage() {
    console.log('TEST121212');
    this.router.navigate(['familymanagement']);
  }

  linkpangenterprise() {
    console.log('nooktest');
    this.router.navigate(['enterprisemanagement']);
  }

  delete() { }

  gotomanagementFamily() {
    console.log('gotomanagementFamily');
  }

}
