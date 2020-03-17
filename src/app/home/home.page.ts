import { Component, OnInit } from '@angular/core';
import {
  NavController,
  MenuController,
  AlertController,
  ToastController,
  LoadingController
} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService, transaction } from 'src/app/services/transaction.service';
import { from } from 'rxjs';
import { async } from '@angular/core/testing';
import { importExpr } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public account_id: string;
  public account_name: string;
  public income: number;
  public Expense: number;
  public balance: number;
  public account_type: string;
  public user_session: any = [];
  public transaction = [];
  public tran = [];
  public value: boolean;
  constructor(
    public menu: MenuController,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public user: UserService,
    public transactionService: TransactionService,
    public accountService: AccountService
  ) {}

  ngOnInit() {
    this.income = 0;
    this.Expense = 0;
    this.balance = 0;
    this.value = true;
    this.menu.enable(true, 'menuSilde');
    this.load_session_user();
    this.load_session_account();
    this.accountService.isAuthenAccount();
  }

  ionViewWillEnter() {
    this.load_session_user();
    this.load_session_account();
    this.accountService.isAuthenAccount();
  }

  async load_session_account() {
    this.account_id = this.accountService.get_session_account_id();
    this.account_name = this.accountService.get_session_account_name();
    // console.log(this.account_id)
    // console.log(this.account_name)
    await this.get_transaction();
  }

  load_session_user() {
    this.user_session = this.user.get_session_user();
  }

  async get_transaction() {
     this.transactionService.get_transaction().subscribe( res => {
      this.tran = res;
      this.check_transaction();
    });

    
  }

  check_transaction() {
    // console.log(this.tran);
    let index = 0;
    for (let i = 0; i < this.tran.length; i++) {
      console.log(i + ' ' + this.tran[i].tran_account_id + ' ' + this.account_id);
      if (this.tran[i].tran_account_id == this.account_id && index < 5) {
        this.transaction.push(this.tran[i])
        index++;
        this.value = false;
      }
    }

    this.setvalue();
  }

  setvalue() {
      for (let i = 0; i < this.transaction.length; i++) {
        if (this.transaction[i].tran_category_type == 'income') {
          this.income += parseInt(this.transaction[i].tran_amount);
        } else {
          this.Expense += parseInt(this.transaction[i].tran_amount);
        }
      }
      this.balance = this.income - this.Expense;
  }

  // Add transactions
  add() {
    this.income = 0;
    this.Expense = 0;
    this.balance = 0;
    for(let i = 0; i < this.transaction.length; i++){
      this.transaction.pop();
    }
    this.router.navigate(['add'], { replaceUrl: true });
  }
}
