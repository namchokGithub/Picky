import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export interface Type_account{
  id?: string,
  tyNameTH: string,
  tyNameEN: string,
}
@Injectable({
  providedIn: 'root'
})
export class TypeAccountService {

  private type_account: Observable<Type_account[]>;
  private type_account_Collection: AngularFirestoreCollection<Type_account>;

  constructor(private afs: AngularFirestore) {
    this.type_account_Collection = this.afs.collection<Type_account>("type_account");
    this.type_account = this.type_account_Collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  get_type_account(): Observable<Type_account[]> {
    return this.type_account;
  }

  get_type_account_By_Id(id: string): Observable<Type_account> {
    return this.type_account_Collection
      .doc<Type_account>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(type_account => {
          type_account.id = id;
          return type_account;
        })
      );
  }

  add_type_account(Type_account: Type_account): Promise<DocumentReference> {
    return this.type_account_Collection.add(Type_account);
  }

  update_type_account(Type_account: Type_account): Promise<void> {
    return this.type_account_Collection.doc(Type_account.id).update({
      tyNameTH: Type_account.tyNameTH,
      tyNameEN: Type_account.tyNameEN
    });
  }

  delete_type_account(id: string): Promise<void> {
    return this.type_account_Collection.doc(id).delete();
  }
}
