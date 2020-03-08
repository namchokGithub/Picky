import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, ModalController } from '@ionic/angular';



@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  private type_catagory: string = 'income';
  constructor(private nav: NavController, private router: Router) { }
    public category_income = [
      {title: 'Bonus'},
      {title: 'Lotter'},
      {title: 'Salary'},
      {title: 'Tips'},
      {title: 'Others'}
    ];

    public category_expense = [
      {title: 'Bill'},
      {title: 'Cloth'}
    ];

 
  ngOnInit() {
  }

  back() {
    this.router.navigate(['add'], { replaceUrl: true });
  }
  ChecktypeCatagory(type: string){
    console.log(type);
      if(type=='income'){
        this.type_catagory = 'income';
      }else{

        this.type_catagory = 'Expense';
      }

  }
}
