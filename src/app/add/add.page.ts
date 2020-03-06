import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  
  
  constructor(private nav: NavController, private modalController: ModalController, private router: Router) { }

  ngOnInit() {

  }

  openModal() {

  }

  goCategoryPage() {
    this.router.navigate(['category']);
  }

  back() {
    this.router.navigate(['home'], { replaceUrl: true });
  }

  confirm() {
    this.router.navigate(['home'], { replaceUrl: true });
  }
 
}
