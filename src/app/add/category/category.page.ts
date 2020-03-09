import { AddPage } from './../add.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, ModalController, NavParams} from '@ionic/angular';



@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  private type_catagory: string = 'income';
<<<<<<< HEAD
  constructor(public nav: NavController, private router: Router, private navParams: NavParams ) {

    

   }
=======
 
  Income = ["Bonus","Lotter","Salary","Tips","Others"];
  Expense = ["Bill","Cloth"];

  constructor(private nav: NavController, private router: Router) {

  }

>>>>>>> c51e732bb929a7341d988b3c24ce5475cf5bef0e
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
<<<<<<< HEAD
  }

  sentcategory(category:String){

      console.log(category);
    
=======
>>>>>>> c51e732bb929a7341d988b3c24ce5475cf5bef0e
  }

  categoryincome(income){
  console.log(income)
    this.router.navigate(['add'], {queryParams: {Income: income}});
} 
  categoryexpense(expense){
  console.log(expense)
    this.router.navigate(['add'], {queryParams: {Expense: expense}});
} 

}
