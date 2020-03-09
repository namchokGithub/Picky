import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export interface List_record {
  id?: string;
  record_name_en: string;
  record_name_th: string;
  record_type: number;
}

@Injectable({
  providedIn: 'root'
})

// ไปคอมเม้นมาทุกส่วน
export class ListRecordService {

  private list_record: Observable<List_record[]>;
  private list_record_Collection: AngularFirestoreCollection<List_record>;

  constructor(private afs: AngularFirestore) {
    this.list_record_Collection = this.afs.collection<List_record>("list_record");
    this.list_record = this.list_record_Collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  get_list_record(): Observable<List_record[]> {
    return this.list_record;
  }

  get_list_record_By_Id(id: string): Observable<List_record> {
    return this.list_record_Collection
      .doc<List_record>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(list_record => {
          list_record.id = id;
          return list_record;
        })
      );
  }

  add_list_record(List_record: List_record): Promise<DocumentReference> {
    return this.list_record_Collection.add(List_record);
  }

  update_list_record(List_record: List_record): Promise<void> {
    return this.list_record_Collection.doc(List_record.id).update({
      record_name_en: List_record.record_name_en,
      record_name_th: List_record.record_name_th,
      record_type: List_record.record_type,
      
    });
  }

  delete_list_record(id: string): Promise<void> {
    return this.list_record_Collection.doc(id).delete();
  }
}
