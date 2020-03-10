import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export interface List_transection {
  id?: string;
  ListMemAccId: string;
  ListTsId: string;
  create_list: string;
  ListDate: Date;
}

@Injectable({
  providedIn: "root"
})
export class ListTransectionService {
  private list_transection: Observable<List_transection[]>;
  private list_transection_Collection: AngularFirestoreCollection<List_transection>;

  constructor(private afs: AngularFirestore) {
    this.list_transection_Collection = this.afs.collection<List_transection>("list_transection");
    this.list_transection = this.list_transection_Collection
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  get_list_transaction(): Observable<List_transection[]> {
    return this.list_transection;
  }

  get_list_transaction_Collection_By_Id(id: string): Observable<List_transection> {
    return this.list_transection_Collection
      .doc<List_transection>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(list_transection => {
          list_transection.id = id;
          return list_transection;
        })
      );
  }

  add_list_transaction(List_transection: List_transection): Promise<DocumentReference> {
    return this.list_transection_Collection.add(List_transection);
  }

  update_account(List_transection: List_transection): Promise<void> {
    return this.list_transection_Collection.doc(List_transection.id).update({
      ListMemAccId: List_transection.ListMemAccId,
      ListTsId: List_transection.ListTsId,
      create_list: List_transection.create_list,
      ListDate: List_transection.ListDate
    });
  }

  delete_account(id: string): Promise<void> {
    return this.list_transection_Collection.doc(id).delete();
  }
}
