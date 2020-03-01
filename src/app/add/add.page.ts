import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private nav: NavController,private modalController: ModalController) { }

  ngOnInit() {
  }
  openModal(){

 
  }
}
