//import injectable from angular/core
import { Injectable } from '@angular/core'; 

//import AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference from angular/fire/firestore
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';


//import map,take from rxjs/operators
import { map, take } from 'rxjs/operators';

//import Observable from rxjs
import { Observable } from 'rxjs';

//import async from angular/core/testing
import { async } from '@angular/core/testing';
export interface Person {
  id?:string;
  balance: number;
  name_account: string;
  user_id: string;
  user_name: string;
}

@Injectable({
  providedIn: 'root'
})

export class AccountPersonService {
  
  //account_person valible angular
  private account_person: Observable<Person[]>;

  //account_person_collection valible angular 
  private account_person_collection: AngularFirestoreCollection<Person>;


  constructor(private afs: AngularFirestore) {
    this.account_person_collection = this.afs.collection<Person>('account_person');
    this.account_person = this.account_person_collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  get_account_person(): Observable<Person[]> {
    return this.account_person;
  }

  get_acount_person_By_Id(id: string): Observable<Person> {
    return this.account_person_collection
      .doc<Person>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(account_person => {
          account_person.id = id;
          return account_person;
        })
      );
  }

  // tslint:disable-next-line: no-shadowed-variable
  add_account_person(person: Person): Promise<DocumentReference> {
    return this.account_person_collection.add(person);
  }

  // tslint:disable-next-line: no-shadowed-variable
  update_account_person(person: Person): Promise<void> {
    return this.account_person_collection.doc(person.id).update({
      balance : person.balance,
      name_account: person.name_account,
      user_id :person.user_id,
      user_name :person.user_name
    });
  }

  delete_account_person(id: string): Promise<void> {
    return this.account_person_collection.doc(id).delete();
  }
  
}
