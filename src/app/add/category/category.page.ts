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
  Income = ["Bonus","Lotter","Salary","Tips","Others"];
  //public category_income:string[]

  constructor(private nav: NavController, private router: Router) { 

   // this.category_income = ["Bonus","Lotter","Salary","Tips","Others"];

  }

    // public category_income = [
    //   {title: 'Bonus'},
    //   {title: 'Lotter'},
    //   {title: 'Salary'},
    //   {title: 'Tips'},
    //   {title: 'Others'}
    // ];

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

  categoryincome(income){
    console.log("what")
  console.log(income)
    this.router.navigate(['add'], {queryParams: {Income: income}});
} 


}
