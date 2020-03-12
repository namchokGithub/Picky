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

export interface Family {
  id?: string;
  balance: number;
  name_account: string;
  user_member: any[];
}
@Injectable({
  providedIn: 'root'
})

export class AccountFamilyService {
  // account_person valible angular
  private account_family: Observable<Family[]>;

  // account_person_collection valible angular
  private account_family_collection: AngularFirestoreCollection<Family>;

  constructor(private afs: AngularFirestore) {
    this.account_family_collection = this.afs.collection<Family>('account_family');
  }

  // Function get_account_family
  // create by : kittisak noidonpai
  // จะทำการคืนค่า account_family ทั้งหมดในที่อยู่ในฐานข้อมูล
  get_account_family(): Observable<Family[]> {
    return this.account_family = this.account_family_collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Function get_account_family_By_Id
  // create by : kittisak noidonpai
  // จะทำการคืนค่า acount_family ตาม id ที่ทำการส่งเข้ามา
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

  // Function add_account_family
  // create by : kittisak noidonpai
  // จะทำการ บันทึกข้อมูลของ account_family ลงใน firestore
  add_account_family(family: Family): Promise<DocumentReference> {
    return this.account_family_collection.add(family);
  }

  // Function update_account_family
  // create by : kittisak noidonpai
  // จะทำการ เปลี่ยนข้อมูลของ account_family ตาม id ใน firestore
  update_account_family(family: Family): Promise<void> {
    return this.account_family_collection.doc(family.id).update({
      balance : family.balance,
      name_account: family.name_account,
      user_member: family.user_member
    });
  }

  // Function delete_account_family
  // create by : kittisak noidonpai
  // จะทำการ ลบข้อมูลของ account_family ตาม id ใน firestore
  delete_account_family(id: string): Promise<void> {
    return this.account_family_collection.doc(id).delete();
  }
}
