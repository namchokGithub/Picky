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
import {
  AccountPersonService,
  Person
} from 'src/app/services/account-person.service';

import { RecordService, Record } from 'src/app/services/record.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  person_account: Person = {
    balance: 0,
    name_account: '',
    user_id: '',
    user_name: ''
  };

  record_account: Record = {
    account_id: '',
    account_name: '',
    user_record: [],
  };

  private user_session: any[];
  private account_person: any[];

  constructor(
    private menu: MenuController,
    private activatedRoute: ActivatedRoute,
    private user: UserService,
    private accountPersonService: AccountPersonService
  ) {}

  ngOnInit() {
    this.menu.enable(true, 'menuSilde');
    this.load_session_user();
  }

  load_session_user() {
    this.user_session = this.user.get_session_user();
    // console.log(this.user_session);
  }
}
