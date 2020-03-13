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
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  private account_id:string;
  private account_name:string;
  private income:number;
  private express:number;
  private balance:number;
  private account_type:string;
  private user_session: any = [];
  private transaction:transaction[]
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
    this.express = 0;
    this.balance = 0;
    this.value = true;
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.account_id  = params.get('account_id')
      console.log(this.account_id)
      this.account_name = params.get('account_name')
      console.log(this.account_name)
   });

    this.menu.enable(true,"menuSilde");
    this.load_session_user();
  }

  async load_session_user() {
    this.user_session = this.user.get_session_user();
    await this.get_transaction()
  }

  get_transaction(){
    this.transactionService.get_transaction().subscribe( res=>{
      if(res){
        for(let i = 0;i< res.length; i++){
          if(res[i].tran_account_id == this.account_id){
            this.transaction[i] = res[i]
          }
        }
        console.log(this.transaction);
        this.setvalue()
      }else{
        this.value = false;
      }
     
    })
  }

  setvalue(){
    for(let i = 0;i < this.transaction.length; i++){
      if(this.transaction[i].tran_category_type == "income"){
        this.income += parseInt(this.transaction[i].tran_amount)
      }else{
        this.express += parseInt(this.transaction[i].tran_amount)
      }
    }
    this.balance = this.income - this.express;
  } 
  
  


  add(){
    this.router.navigate(['add'], {queryParams: {account_id:this.account_id,account_name:this.account_name}});
  }

 
}
