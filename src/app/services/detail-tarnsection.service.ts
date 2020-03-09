import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export interface Detail_tarnsection {
  id?: string;
  typets_name_th: string;
  typets_name_en: string;
}

@Injectable({
  providedIn: "root"
})
export class DetailTarnsectionService {
  private detail_tarnsection: Observable<Detail_tarnsection[]>;
  private detail_tarnsection_Collection: AngularFirestoreCollection<Detail_tarnsection>;

  constructor(private afs: AngularFirestore) {
    this.detail_tarnsection_Collection = this.afs.collection<Detail_tarnsection>("detail_tarnsection");
    this.detail_tarnsection = this.detail_tarnsection_Collection
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

  get_detail_tarnsection(): Observable<Detail_tarnsection[]> {
    return this.detail_tarnsection;
  }

  get_detail_tarnsection_By_Id(id: string){
    return this.detail_tarnsection_Collection
      .doc<Account>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(detail_tarnsection => {
          detail_tarnsection.id = id;
          return detail_tarnsection;
        })
      );
  }

  add_detail_tarnsection(Detail_tarnsection: Detail_tarnsection): Promise<DocumentReference> {
    return this.detail_tarnsection_Collection.add(Detail_tarnsection);
  }

  update_account(Detail_tarnsection: Detail_tarnsection): Promise<void> {
    return this.detail_tarnsection_Collection.doc(Detail_tarnsection.id).update({
      typets_name_th: Detail_tarnsection.typets_name_th,
      typets_name_en: Detail_tarnsection.typets_name_en
    });
  }

  delete_account(id: string): Promise<void> {
    return this.detail_tarnsection_Collection.doc(id).delete();
  }
}
