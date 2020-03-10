import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export interface Member_account{
  id?: string,
  AccId: string,
  UsId: string
}

@Injectable({
  providedIn: 'root'
})
export class MemberAccountService {
  private member_account: Observable<Member_account[]>;
  private member_account_Collection: AngularFirestoreCollection<Member_account>;

  constructor(private afs: AngularFirestore) {
    this.member_account_Collection = this.afs.collection<Member_account>("member_account");
    this.member_account = this.member_account_Collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }

   get_member_account(): Observable<Member_account[]> {
    return this.member_account;
  }

  get_member_account_By_Id(id: string): Observable<Member_account> {
    return this.member_account_Collection
      .doc<Member_account>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(member_account => {
          member_account.id = id;
          return member_account;
        })
      );
  }

  add_member_account(Member_account: Member_account): Promise<DocumentReference> {
    return this.member_account_Collection.add(Member_account);
  }

  update_member_account(Member_account: Member_account): Promise<void> {
    return this.member_account_Collection.doc(Member_account.id).update({
      AccId: Member_account.AccId,
      UsId: Member_account.UsId
    });
  }

  delete_member_account(id: string): Promise<void> {
    return this.member_account_Collection.doc(id).delete();
  }
}
