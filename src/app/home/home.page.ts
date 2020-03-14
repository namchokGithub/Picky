import { Component, OnInit } from "@angular/core";
import {
  NavController,
  MenuController,
  AlertController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService, User } from "src/app/services/user.service";
import { TransactionService,transaction } from 'src/app/services/transaction.service';
import { from } from "rxjs";
import { async } from '@angular/core/testing';
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  private account_id:string;
  private account_name:string;
  private income:number;
  private Expense:number;
  private balance:number;
  private account_type:string;
  private user_session: any = [];
  private transaction = []
  private tran = []
  private value:boolean
  constructor(
    private menu: MenuController,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private user: UserService,
    private transactionService :TransactionService
  ) {
    
  }

  ngOnInit() {
    this.income = 0;
    this.Expense = 0;
    this.balance = 0;
    this.value = true;
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.account_id  = params.get('account_id')
      //console.log(this.account_id)
      this.account_name = params.get('account_name')
      //console.log(this.account_name)
   });

    this.menu.enable(true,"menuSilde");
    this.load_session_user();
    this.get_transaction()
  }

  load_session_user() {
    this.user_session = this.user.get_session_user();
  }

  get_transaction(){
     this.transactionService.get_transaction().subscribe( res=>{
      this.tran = res;
      this.check_transaction()
    })
  }

  check_transaction(){
   
    for(let i = 0;i< this.tran.length; i++){
      console.log(i+' '+this.tran[i].tran_account_id+' '+this.account_id)
      if(this.tran[i].tran_account_id == this.account_id){
        this.transaction[i] = this.tran[i]
      }
    }
    this.setvalue()
  }

  setvalue(){
    for(let i = 0;i < this.transaction.length; i++){
      if(this.transaction[i].tran_category_type == "income"){
        this.income += parseInt(this.transaction[i].tran_amount)
      }else{
        this.Expense += parseInt(this.transaction[i].tran_amount)
      }
    }
    this.balance = this.income - this.Expense;
  } 

  add(){
    this.income = 0;
    this.Expense = 0;
    this.balance = 0;
    this.router.navigate(['add'], {queryParams: {account_id:this.account_id,account_name:this.account_name}});
  }

 
}
