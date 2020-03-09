import { AddPage } from './../add.page';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { ListRecordService } from './../../services/list-record.service';



@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  private type_catagory: string = 'income';

  constructor(public nav: NavController, private router: Router, private navParams: NavParams ) {

  
   }

 
  public category_income : any = [];
  public category_expense : any = [];

  constructor(
    private nav: NavController, 
    private router: Router,
    private ListRecordService: ListRecordService) {
      
  }

// * @Function   : ngOnInit => ดึงข้อมูลจาก ListRecordService แล้วทำการบันทึกข้อมูล ลง array โดยมีการแยกประเภท Income ,  expense
// * @Author     : Komsan Tesana
// * @Create Date: 10/3/2563

  ngOnInit(){

      this.ListRecordService.get_list_record().subscribe(async res => {


        console.log(res);
              

        for(var i = 0; i < res.length ; i++){
                if(res[i].record_type=="Income"){

                  this.category_income.push(res[i]);
                }else{

                  this.category_expense.push(res[i]);
                }
        }

        console.log(this.category_income);
        console.log(this.category_expense);
      });
  }

// * @Function   : back => ย้อนกลับไปหน้า add
// * @Author     : Komsan Tesana
// * @Create Date: 10/3/2563

  back() {
    this.router.navigate(['add'], { replaceUrl: true });
  }

// * @Function   : ChecktypeCatagory เปลี่ยนค่า type category เพื่อแสดงข้อมูลในส่วน view
// * @Author     : Komsan Tesana
// * @Create Date: 10/3/2563
  ChecktypeCatagory(type: string){ 
     console.log(type);
      if(type == 'income'){
        this.type_catagory = 'income';
      }else{
        this.type_catagory = 'Expense';
      }
  }

  sentcategory(category:String){

      console.log(category);
  }


// * @Function   : settype_category ส่งค่า category  ที่เลือกส่งไปยังหน้า add โดยมีการส่งค่า type และ ชื่อ
// * @Author     : Komsan Tesana
// * @Create Date: 10/3/2563
    settype_category(type:String,record_name:String){
       console.log(type+' '+record_name);
       this.router.navigate(['add'], {queryParams: {Type_category: type,record_name: record_name}});
    }
 

}
