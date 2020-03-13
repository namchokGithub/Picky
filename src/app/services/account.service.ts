// import injectable from angular/core
import { Injectable } from '@angular/core';

// import AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference from angular/fire/firestore
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';


// import map,take from rxjs/operators
import { map, take } from 'rxjs/operators';

// import Observable from rxjs
import { Observable } from 'rxjs';

// import async from angular/core/testing
import { async } from '@angular/core/testing';

export interface Person {
  id?: string;
  balance: number;
  name_account: string;
  user_id: string;
  user_name: string;
  account_type:string
}

export interface non_Person {
  id?: string;
  balance: number;
  name_account: string;
  user_member: any[];
  account_type:string
}


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // account_person valible angular
  private account_person: Observable<Person[]>;

  // account_person_collection valible angular
  private account_person_collection: AngularFirestoreCollection<Person>;

  // account_non_person
  private account_non_person: Observable<non_Person[]>;

  // account_non_person_collection valible angular
  private account_non_person_collection: AngularFirestoreCollection<non_Person>;

  constructor() { }
}
