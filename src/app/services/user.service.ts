// ไปคอมเม้นมาทุกส่วน
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
export interface User {
  id?: string;
  user_id: string;
  user_name: string;
  user_password: string;
}
// ไปคอมเม้นมาทุกส่วน
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private set_user : any[];

  private user: Observable<User[]>;
  // tslint:disable-next-line: variable-name
  private user_collection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.user_collection = this.afs.collection<User>('user');
  }

  // Function get_user
  // create by : kittisak noidonpai
  // จะทำการคืนค่า user ทั้งหมดในที่อยู่ในฐานข้อมูล
  get_user(): Observable<User[]> {
    return this.user = this.user_collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Function get_user_By_Id
  // create by : kittisak noidonpai
  // จะทำการคืนค่า user ตาม id ที่ทำการส่งเข้ามา
  get_user_By_Id(id: string): Observable<User> {
    return this.user_collection
      .doc<User>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(user => {
          user.id = id;
          return user;
        })
      );
  }

  // Function add_user
  // create by : kittisak noidonpai
  // จะทำการ บันทึกข้อมูลของ user ลงใน firestore
  add_user(User: User): Promise<DocumentReference> {
    return this.user_collection.add(User);
  }

  // Function update_user
  // create by : kittisak noidonpai
  // จะทำการ เปลี่ยนข้อมูลของ user ตาม id ใน firestore
  update_user(User: User): Promise<void> {
    return this.user_collection.doc(User.id).update({
      user_email: User.user_id,
      user_name: User.user_name,
      user_password: User.user_password
    });
  }

  // Function delete_user
  // create by : kittisak noidonpai
  // จะทำการ ลบข้อมูลของ user ตาม id ใน firestore
  delete_user(id: string): Promise<void> {
    return this.user_collection.doc(id).delete();
  }

  // Function set_session_user
  // create by : kittisak noidonpai
  // จะทำการ set ข้อมูลของ user ที่ login มาเก็บไว้
  set_session_user(User: any) {
    this.set_user = User;
  }

  // Function get_session_user
  // create by : kittisak noidonpai
  // จะทำการคืนค่าข้อมูลของ user ที่loging เข้าใช้งานระบบ
  get_session_user() {
    return this.set_user;
  }

}
