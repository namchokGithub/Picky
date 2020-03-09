import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export interface User {
  id?: string;
  usUsername: number;
  usPassword: string;
  usFirstname: string;
  usLastname: string;
  usEmail: string;
  usTel: string;
}

@Injectable({
  providedIn: "root"
})  
export class UserService {
  private user: Observable<User[]>;
  private user_Collection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.user_Collection = this.afs.collection<User>("user");
    this.user = this.user_Collection.snapshotChanges().pipe(
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
    return this.user_Collection
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

  add_user(User: User): Promise<DocumentReference> {
    return this.user_Collection.add(User);
  }

  update_user(User: User): Promise<void> {
    return this.user_Collection.doc(User.id).update({
      usUsername: User.usUsername,
      usPassword: User.usPassword,
      usFirstname: User.usFirstname,
      usLastname: User.usLastname,
      usEmail: User.usEmail,
      usTel : User.usTel
    }); 
  }

  delete_user(id: string): Promise<void> {
    return this.user_Collection.doc(id).delete();
  }
}
