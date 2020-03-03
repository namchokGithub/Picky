import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor() { }
    public category = [
      {title:'Bonus'},
      {title:'Lotter'},
      {title:'Salary'},
      {title:'Tips'},
      {title:'Others'}
    ]
  ngOnInit() {
  }
  
}
