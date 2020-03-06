import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-familymanagement',
  templateUrl: './familymanagement.page.html',
  styleUrls: ['./familymanagement.page.scss'],
})
export class FamilymanagementPage implements OnInit {
  name = "Namhokss"

  constructor(public navCtrl: NavController, private router: Router) { }


  ngOnInit() {
  }

  back() {
    this.router.navigate(['showaccount'], { replaceUrl: true });
  }
  logout() {
    this.router.navigate(['login'], { replaceUrl: true });
  }
}
