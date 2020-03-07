import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  
  income :string = ""
  expense :string = ""
  cash :string = ""
  category :string = ""
  date :string = ""
  note :string = ""

  constructor(private nav: NavController,
              private modalController: ModalController, 
              public activatedRoute: ActivatedRoute,
              private router: Router,public alertController: AlertController) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
       this.income  =params.get('Income')
       this.expense  =params.get('Expense')
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

  async addtransaction() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async add(){
    this.cash;
    this.category;
    this.date;
    this.note;
  }
}
