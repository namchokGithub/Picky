/**
 * @File : home.page.ts
 * service of add transactions
 */

import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

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

  async ngOnInit() {
    this.income = 0;
    this.Expense = 0;
    this.balance = 0;
    this.value = true;
    this.menu.enable(true, 'menuSilde');
    await this.load_session_user();
    await this.load_session_account();
    await this.get();
    this.accountService.isAuthenAccount();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  ionViewWillEnter() {
    this.load_session_user();
    this.load_session_account();
    this.accountService.isAuthenAccount();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  async load_session_account() {
    this.account_id = this.accountService.get_session_account_id();
    this.account_name = this.accountService.get_session_account_name();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  load_session_user() {
    this.user_session = this.user.get_session_user();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  async get() {
     this.transactionService.get_transaction().subscribe( res => {
      console.log(res);
      this.tran = res;
      this.check_transaction();
    });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  check_transaction() {
    // console.log('check_transaction');
    // console.log(this.tran);
    // console.log(this.tran);
    let index = 0;
    for (let i = 0; i < this.tran.length; i++) {
      console.log(i + ' ' + this.tran[i].tran_account_id + ' ' + this.account_id);
      if (this.tran[i].tran_account_id == this.account_id && index < 5) {
        this.transaction.push(this.tran[i]);
        this.value = false;
        index++;
      }
    }
    this.setvalue();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  setvalue() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.transaction.length; i++) {
      if (this.transaction[i].tran_category_type == 'income') {
        this.income += parseInt(this.transaction[i].tran_amount);
      } else {
        this.Expense += parseInt(this.transaction[i].tran_amount);
      }
    }
    this.balance = this.income - this.Expense;
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  // Add transactions
  add() {
    this.income = 0;
    this.Expense = 0;
    this.balance = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.transaction.length; i++) {
      this.transaction.pop();
    }
    this.router.navigate(['add'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //
}
