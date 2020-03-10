//import injectable from angular/core
import { Injectable } from "@angular/core";

//import AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference from angular/fire/firestore
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";

//import map,take from rxjs/operators
import { map, take } from "rxjs/operators";

//import Observable from rxjs
import { Observable } from "rxjs";

//import async from angular/core/testing
import { async } from "@angular/core/testing";

export interface Family {
  id?: string;
  balance: number;
  name_account: string;
  user_member: any[];
}

@Injectable({
  providedIn: "root"
})
export class AccountFamilyService {
  //account_person valible angular
  private account_family: Observable<Family[]>;

  //account_person_collection valible angular
  private account_family_collection: AngularFirestoreCollection<Family>;

  constructor(private afs: AngularFirestore) {
    this.account_family_collection = this.afs.collection<Family>('account_family');
    this.account_family = this.account_family_collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  get_account_family(): Observable<Family[]> {
    return this.account_family;
  }

  get_account_family_By_Id(id: string): Observable<Family> {
    return this.account_family_collection
      .doc<Family>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(user => {
          user.id = id;
          return user;
        })
      );
  }

  // tslint:disable-next-line: no-shadowed-variable
  add_account_family(family: Family): Promise<DocumentReference> {
    return this.account_family_collection.add(family);
  }

  // tslint:disable-next-line: no-shadowed-variable
  update_account_family(family: Family): Promise<void> {
    return this.account_family_collection.doc(family.id).update({
      balance : family.balance,
      name_account: family.name_account,
      user_member:family.user_member
    });
  }

  delete_account_family(id: string): Promise<void> {
    return this.account_family_collection.doc(id).delete();
  }
}
