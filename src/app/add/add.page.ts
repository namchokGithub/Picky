import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  
  income :string = ""
  constructor(private nav: NavController,
              private modalController: ModalController, 
              public activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
       this.income  =params.get('Income');
      //console.log(params.get('Income'))
    });
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
