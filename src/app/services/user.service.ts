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
<<<<<<< HEAD

=======
import { async } from '@angular/core/testing';
>>>>>>> origin/DevMaster
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
  private user: Observable<User[]>;
  // tslint:disable-next-line: variable-name
  private user_collection: AngularFirestoreCollection<User>;
  private check: any[];
  constructor(private afs: AngularFirestore) {
    this.user_collection = this.afs.collection<User>('user');
    this.user = this.user_collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  get_user(): Observable<User[]> {
    return this.user;
  }

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

  // tslint:disable-next-line: no-shadowed-variable
  add_user(User: User): Promise<DocumentReference> {
    return this.user_collection.add(User);
  }

  // tslint:disable-next-line: no-shadowed-variable
  update_user(User: User): Promise<void> {
    return this.user_collection.doc(User.id).update({
      user_email: User.user_id,
      user_name: User.user_name,
      user_password: User.user_password
    });
  }

  delete_user(id: string): Promise<void> {
    return this.user_collection.doc(id).delete();
  }

  // tslint:disable-next-line: variable-name
  check_user(user_id: string) {
    return this.user_collection.doc<User>(user_id).valueChanges().pipe(
        take(1),
        map(user => {
          user.user_id = user_id;
          return user;
        })
      );
  }
}
