import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export interface Account {
  id?: string;
  accAmount: number;
  accName: string;
  accTypeId: string;
}

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private account: Observable<Account[]>;
  private account_Collection: AngularFirestoreCollection<Account>;

  constructor(private afs: AngularFirestore) {
    this.account_Collection = this.afs.collection<Account>("account");
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
      accAmount: Account.accAmount,
      accName: Account.accName,
      accTypeId: Account.accTypeId
    });
  }

  delete_account(id: string): Promise<void> {
    return this.account_Collection.doc(id).delete();
  }
}
