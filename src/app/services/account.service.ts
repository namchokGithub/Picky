import { Family } from './account-family.service';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Account {
  id?: string;
  balance: number;
  name_account: string;
  type_account: string;
  user_member:[];
}


// ไปคอมเม้นมาทุกส่วน
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private account: Observable<Account[]>;
  private account_Collection: AngularFirestoreCollection<Account>;

  constructor(private afs: AngularFirestore) {
    this.account_Collection = this.afs.collection<Account>('account');
    this.account = this.account_Collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  get_account(): Observable<Account[]> {
    return this.account;
  }

  get_account_By_Id(id: string): Observable<Account> {
    return this.account_Collection
      .doc<Account>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(account => {
          account.id = id;
          return account;
        })
      );
  }

  add_account(Account: Account): Promise<DocumentReference> {
    return this.account_Collection.add(Account);
  }

  update_account(Account: Account): Promise<void> {
    return this.account_Collection.doc(Account.id).update({
      balance: Account.balance,
      name_account: Account.name_account,
      type_account: Account.type_account,
      user_member: Account.user_member
    });
  }

  delete_account(id: string): Promise<void> {
    return this.account_Collection.doc(id).delete();
  }
}