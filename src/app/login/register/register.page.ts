import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-regis',
  templateUrl: './regis.page.html',
  styleUrls: ['./regis.page.scss'],
})
export class RegisPage implements OnInit {

  constructor(public navCtrl: NavController,private router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(['home'])
  }

}
