import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export interface Transection{
  id?: string,
  detail_transection: string,
  tsType: number,
  tsAmount: number
}

@Injectable({
  providedIn: 'root'
})
export class TransectionService {
  private transection: Observable<Transection[]>;
  private transection_Collection: AngularFirestoreCollection<Transection>;

  constructor(private afs: AngularFirestore) { 
    this.transection_Collection = this.afs.collection<Transection>("transection");
    this.transection = this.transection_Collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  get_transection(): Observable<Transection[]> {
    return this.transection;
  }

  get_transection_By_Id(id: string): Observable<Transection> {
    return this.transection_Collection
      .doc<Transection>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(transection => {
          transection.id = id;
          return transection;
        })
      );
  }

  add_transection(Transection: Transection): Promise<DocumentReference> {
    return this.transection_Collection.add(Transection);
  }

  update_transection(Transection: Transection): Promise<void> {
    return this.transection_Collection.doc(Transection.id).update({
      detail_transection: Transection.detail_transection,
      tsType: Transection.tsType,
      tsAmount: Transection.tsAmount
    });
  }

  delete_transection(id: string): Promise<void> {
    return this.transection_Collection.doc(id).delete();
  }
}
