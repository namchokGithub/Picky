// import injectable from angular/core
import { Injectable } from "@angular/core";

// import AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference from angular/fire/firestore
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";

// import map,take from rxjs/operators
import { map, take } from "rxjs/operators";

// import Observable from rxjs
import { Observable } from "rxjs";

// import async from angular/core/testing
import { async } from "@angular/core/testing";


export interface transaction {
  id?: string;
  tran_account_id:string;
  tran_account: string;
  tran_amount: string;
  tran_category_type: string;
  tran_category_name: string;
  tran_date: string;
  tran_note:string;
  tran_user:string
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  private transaction: Observable<transaction[]>;
  // tslint:disable-next-line: variable-name
  private transaction_collection: AngularFirestoreCollection<transaction>;

  constructor(private afs: AngularFirestore) {
    this.transaction_collection = this.afs.collection<transaction>('transaction');
  }

  // Function get_transaction
  // create by : kittisak noidonpai
  // จะทำการคืนค่า transaction ทั้งหมดในที่อยู่ในฐานข้อมูล
  get_transaction(): Observable<transaction[]> {
    return this.transaction = this.transaction_collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Function get_transaction_By_Id
  // create by : kittisak noidonpai
  // จะทำการคืนค่า transaction ตาม id ที่ทำการส่งเข้ามา
  get_transaction_By_Id(id: string): Observable<transaction> {
    return this.transaction_collection
      .doc<transaction>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(transaction => {
          transaction.id = id;
          return transaction;
        })
      );
  }

  // Function add_transaction
  // create by : kittisak noidonpai
  // จะทำการ บันทึกข้อมูลของ transaction ลงใน firestore
  add_transaction(transaction: transaction): Promise<DocumentReference> {
    return this.transaction_collection.add(transaction);
  }

  // Function update_transaction
  // create by : kittisak noidonpai
  // จะทำการ เปลี่ยนข้อมูลของ transaction ตาม id ใน firestore
  update_transaction(transaction: transaction): Promise<void> {
    return this.transaction_collection.doc(transaction.id).update({
      tran_account: transaction.tran_account,
      tran_amount: transaction.tran_amount,
      tran_category_type: transaction.tran_category_type,
      tran_category_name: transaction.tran_category_type,
      tran_date: transaction.tran_date,
      tran_note:transaction.tran_note,
      tran_user:transaction.tran_user
    });
  }

  // Function delete_transaction
  // create by : kittisak noidonpai
  // จะทำการ ลบข้อมูลของ user ตาม id ใน firestore
  delete_transaction(id: string): Promise<void> {
    return this.transaction_collection.doc(id).delete();
  }
}
