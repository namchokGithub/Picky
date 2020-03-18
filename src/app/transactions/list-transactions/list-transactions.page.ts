/**
 * @File : list-transactions.page.ts
 * service of list-transactions
 */

import { Component, OnInit } from '@angular/core';
import {
  MenuController,
} from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';
import {
  TransactionService,
  transaction
} from 'src/app/services/transaction.service';
import { from } from 'rxjs';
import { async } from '@angular/core/testing';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-list-transactions',
  templateUrl: './list-transactions.page.html',
  styleUrls: ['./list-transactions.page.scss']
})
export class ListTransactionsPage implements OnInit {

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
  public month: string;
  public date: string;
  public searchtransaction = [];

  constructor(
    public menu: MenuController,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public user: UserService,
    public transactionService: TransactionService,
    public accountService: AccountService
  ) {}

  ngOnInit() {
    this.month = null;
    this.date = null;
    this.income = 0;
    this.Expense = 0;
    this.balance = 0;
    this.value = true;
    this.menu.enable(true, 'menuSilde');
    this.load_session_user();
    this.load_session_account();
    this.check_null();
    console.log(this.tran);
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  async load_session_account() {
    this.account_id = this.accountService.get_session_account_id();
    this.account_name = this.accountService.get_session_account_name();
    await this.get_transaction();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  load_session_user() {
    this.user_session = this.user.get_session_user();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  async get_transaction() {
    this.transactionService.get_transaction().subscribe( res => {
      this.tran = res;
      this.check_transaction();
    });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  async check_transaction() {
    // console.log(this.tran);
    let index = 0;
    for (let i = 0; i < this.tran.length; i++) {
      console.log(i + ' ' + this.tran[i].tran_account_id + ' ' + this.account_id); // this.account_id
      if (this.tran[i].tran_account_id == this.account_id) {
        this.transaction[index] = this.tran[i];
        index++;
      }
    }
    await this.setvalue();
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  setvalue() {
    if (this.transaction.length == 0) {
      this.value = false;
    } else {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.transaction.length; i++) {
        if (this.transaction[i].tran_category_type == 'income') {
          // tslint:disable-next-line: radix
          this.income += parseInt(this.transaction[i].tran_amount);
        } else {
          // tslint:disable-next-line: radix
          this.Expense += parseInt(this.transaction[i].tran_amount);
        }
      }
      this.balance = this.income - this.Expense;
    }
    console.log(this.transaction);
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  search() {
     // sub month & date to show trancition
    if ( this.month != null ) {
      console.log(this.month);
      this.month = this.month.substring(7, 5);
      console.log(this.month);

    }
    if ( this.date != null ) {
      this.date = this.date.substring(10, 8);
      console.log(this.date);
    }
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  check_null() {
    console.log(this.month + this.date);
    if (this.month == null && this.date == null) {
      console.log(true);
      return true;
    } else {
      return false;
    }
  }
  // ----------------------------------------------------------------------------------------------------------------- //

  goHomePage() {
    this.router.navigate(['home'], { replaceUrl: true });
  }
  // ----------------------------------------------------------------------------------------------------------------- //

}
