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
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
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

  private isLoggedIn: boolean;
  private userSession: any[];
  private set_user: any[];
  private username = '';

  private user: Observable<User[]>;

  // tslint:disable-next-line: variable-name
  private user_collection: AngularFirestoreCollection<User>;

  constructor(
              private afs: AngularFirestore,
              public storage: Storage,
              private router: Router ) {

    this.user_collection = this.afs.collection<User>('user');
    this.isLoggedIn = false;

  }

  // Function get_user
  // create by : kittisak noidonpai
  // จะทำการคืนค่า user ทั้งหมดในที่อยู่ในฐานข้อมูล
  // ตัวอย่างข้อมูล
  // {
  //    id:"27cJhfAj5rooxMesV8FJ"
  //    user_id:"noynick123"
  //    user_name:"nick"
  //    user_password:"noynick123"
  // }
  // ตัวอย่างการเรียกใช้
  // this.accountService.get_user().subscribe(res => {})
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
  // ตัวอย่างข้อมูล
  // {
  //    id:"27cJhfAj5rooxMesV8FJ"
  //    user_id:"noynick123"
  //    user_name:"nick"
  //    user_password:"noynick123"
  // }
  // ตัวอย่างการเรียกใช้
  // this.accountService.get_user_By_Id(id).subscribe(res => {})
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
  // ตัวอย่างการเรียกใช้
  // this.accountService.add_user(user)

  add_user(user: User): Promise<DocumentReference> {
    return this.user_collection.add(user);
  }

  // Function update_user
  // create by : kittisak noidonpai
  // จะทำการ เปลี่ยนข้อมูลของ user ตาม id ใน firestore
  // ตัวอย่างการเรียกใช้
  // this.accountService.update_user(user)

  update_user(User: User): Promise<void> {
    return this.user_collection.doc(User.id).update({
      user_name: User.user_name,
      user_password: User.user_password
    });
  }

  // Function update_name_user
  // create by : komsan tesana
  // จะทำการ เปลี่ยนข้อมูลชื่อ user ตาม id ใน firestore
  // ตัวอย่างการเรียกใช้
  // this.accountService.update_name_user(user)
  update_name_user(User: User): Promise<void> {
    return this.user_collection.doc(User.id).update({
      user_name: User.user_name
    });
  }

  // Function delete_user
  // create by : kittisak noidonpai
  // จะทำการ ลบข้อมูลของ user ตาม id ใน firestore
  // ตัวอย่างการเรียกใช้
  // this.accountService.delete_user(id)

  delete_user(id: string): Promise<void> {
    return this.user_collection.doc(id).delete();
  }

  // Function set_session_user
  // create by : kittisak noidonpai
  // จะทำการ set ข้อมูลของ user ที่ login มาเก็บไว้
  // ตัวอย่างการเรียกใช้
  // this.accountService.set_session_user(user)
  set_session_user(user: any) {
    this.set_user = user;
  }

  // Function get_session_user
  // create by : kittisak noidonpai
  // จะทำการคืนค่าข้อมูลของ user ที่loging เข้าใช้งานระบบ
  // ตัวอย่างการเรียกใช้
  // this.accountService.get_session_user()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Function get_session_user
  // create by : Namchok Singhachai
  get_session_user() {
    return this.userSession;
  }

  // Function logoutSession
  // create by : Namchok Singhachai
  logoutSession() {
    this.storage.remove('user').then(() => {
      this.storage.remove('username');
      this.isLoggedIn = false;
      this.userSession = null;
      this.username = null;
      console.log('log out and clear session');
    });
  }

  // Function clearSession
  // create by : Namchok Singhachai
  clearSession() {
    this.storage.remove('user').then(() => {
      this.storage.remove('username');
      this.isLoggedIn = false;
      this.userSession = null;
      this.username = null;
      console.log('clear session');
    });
  }

  // Function logoutSession
  // create by : Namchok Singhachai
  loginSession(user) {
    this.username = user.user_name;
    this.userSession = user;
    this.storage.set('username', user.user_name);
    this.storage.set('user', user);
    console.log('log in and set session');
  }

  // Function isAuthen
  // create by : Namchok Singhachai
  // ตัวอย่างการเรียกใช้
  isAuthen() {
    return this.isLoggedIn;
  }

  // Fucntion getUsername
  // Create by : Namchok
  getUsername() {
    return this.username;
  }

  // * @Function   : isAuthenticated => ตรวจสอบการ Login ว่ามีบันทึกใใน Local Storage หรือไม่
  // * @Author     : Jiramate Phuaphan | Modified by Namchok
  // * @Create Date: 2563-03-13
  async isAuthenticated() {
    await this.storage.get('user').then((user) => {
      this.userSession = user;
      if (user == null) {
        this.isLoggedIn = false;
        console.log('has no user');
      } else {
        this.isLoggedIn = true;
        this.username = user.user_name;
        this.user = user;
        console.log('has user');
      }
    });

    if (this.isLoggedIn == false) {
      this.router.navigate(['login'], { replaceUrl: true });
    }
  }

}
