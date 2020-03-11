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

export interface Business {
  id?: string;
  balance: number;
  name_account: string;
  user_member: any[];
}

@Injectable({
  providedIn: "root"
})
export class AccountBusinessService {
  //account_person valible angular
  private account_business: Observable<Business[]>;

  //account_person_collection valible angular
  private account_business_collection: AngularFirestoreCollection<Business>;

  constructor(private afs: AngularFirestore) {
    this.account_business_collection = this.afs.collection<Business>("account_business");
  }

  // Function get_account_business
  // create by : kittisak noidonpai
  // จะทำการคืนค่า account_business ทั้งหมดในที่อยู่ในฐานข้อมูล 

  get_account_business(): Observable<Business[]> {
    return this.account_business = this.account_business_collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Function get_account_business_By_Id 
  // create by : kittisak noidonpai
  // จะทำการคืนค่า acount_person ตาม id ที่ทำการส่งเข้ามา

  get_account_business_By_Id(id: string): Observable<Business> {
    return this.account_business_collection
      .doc<Business>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(user => {
          user.id = id;
          return user;
        })
      );
  }

  // Function add_account_business
  // create by : kittisak noidonpai
  // จะทำการ บันทึกข้อมูลของ account_business ลงใน firestore

  add_account_business(business: Business): Promise<DocumentReference> {
    return this.account_business_collection.add(business);
  }

  // Function update_account_business
  // create by : kittisak noidonpai
  // จะทำการ เปลี่ยนข้อมูลของ account_business ตาม id ใน firestore 

  update_account_business(business: Business): Promise<void> {
    return this.account_business_collection.doc(business.id).update({
      balance: business.balance,
      name_account: business.name_account,
      user_member: business.user_member
    });
  }

  // Function delete_account_business
  // create by : kittisak noidonpai
  // จะทำการ ลบข้อมูลของ account_business ตาม id ใน firestore 

  delete_account_business(id: string): Promise<void> {
    return this.account_business_collection.doc(id).delete();
  }
}
