import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enterprisemanagement',
  templateUrl: './enterprisemanagement.page.html',
  styleUrls: ['./enterprisemanagement.page.scss'],
})
export class EnterprisemanagementPage implements OnInit {
  Person = [
    {
      name:'Varthinee',
      position : 'Ceo'
    },
    {
      neme:'nook',
      position:'manager'
    }
  ]
  public arr = new Array('One', 'Two', 'Three');

  
  constructor(){}

  ngOnInit(){}

 adddata(){
  
      this.arr.splice(0, 0, "");  //ระบุ parameter 2 เป็น 0 จะเท่ากับการ add
      console.log(this.arr);

  }

  todo = {}
  logForm() {
    console.log(this.todo)
  }

}