/**
 * @File : category.page.ts
 * service of category
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NavController,
  ToastController,
  ModalController
} from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss']
})
export class CategoryPage implements OnInit {
  public categorys: any = [];
  public type_catagory = 'income';
  public account_id: string;
  public account_name: string;
  public category_income: any = [
    {
      record_name: 'เงินเดือน'
    },
    {
      record_name: 'เงินรางวัล'
    },
    {
      record_name: 'เงินดอกเบี้ย'
    },
    {
      record_name: 'สลากกินแบ่ง'
    },
    {
      record_name: 'โบนัส'
    },
    {
      record_name: 'อื่น ๆ'
    }
  ];

  public category_expense: any = [
    {
      record_name: 'ร้านอาหาร'
    },
    {
      record_name: 'บิล'
    },
    {
      record_name: 'การบันเทิง'
    },
    {
      record_name: 'ของขวัญ'
    },
    {
      record_name: 'บริจาค'
    },
    {
      record_name: 'การเดินทาง'
    },
    {
      record_name: 'บันเทิง'
    },
    {
      record_name: 'ท่องเที่ยว'
    },
    {
      record_name: 'ออกกำลังกาย'
    },
    {
      record_name: 'อื่น ๆ'
    }
  ];

  public categores: any = [];
  constructor(
    public nav: NavController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public accountService: AccountService
  ) {}

  // * @Function   : ngOnInit => ดึงข้อมูลจาก ListRecordService แล้วทำการบันทึกข้อมูล ลง array โดยมีการแยกประเภท Income ,  expense
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  ngOnInit() {
    this.type_catagory = 'income';
    this.activatedRoute.queryParamMap.subscribe(params => {});
    this.account_id = this.accountService.get_session_account_id();
    this.account_name = this.accountService.get_session_account_name();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  // * @Function   : back => ย้อนกลับไปหน้า add
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  back() {
    this.router.navigate(['add'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  // * @Function   : setcategorys
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  setcategorys() {

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.categores.length ; i++) {
        // tslint:disable-next-line: triple-equals
        if (this.categores[i].record_type == 'Income' ) {
          this.category_income.push(this.categores[i]);
        } else {
          this.category_expense.push(this.categores[i]);
        }
    }
    // console.log(this.category_income);
    // console.log(this.category_expense);
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  // * @Function   : ChecktypeCatagory เปลี่ยนค่า type category เพื่อแสดงข้อมูลในส่วน view
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  ChecktypeCatagory(type: string) {
    console.log(type);
    if (type === 'income') {
      this.type_catagory = 'income';
    } else {
      this.type_catagory = 'Expense';
    }
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  // * @Function   : settype_category ส่งค่า category  ที่เลือกส่งไปยังหน้า add โดยมีการส่งค่า type และ ชื่อ
  // * @Author     : Komsan Tesana
  // * @Create Date: 10/3/2563
  settype_category(type: string, name_category: string) {
    console.log(type + ' ' + name_category);
    this.router.navigate(['add'],{
      queryParams: { Type_category: type, name_category}
    });
  }
  // ----------------------------------------------------------------------------------------------------------------- //
}
