import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

export interface Record {
  id?: string;
  account_id: number;
  date_record: string;
  list_record: string;
  money_record: string;
  note_record: string;
  type_record: number;
  user_id: string;
  user_name: string;
}
// ไปคอมเม้นมาทุกส่วน
@Injectable({
  providedIn: "root"
})
export class RecordService {
  private record: Observable<Record[]>;
  private record_Collection: AngularFirestoreCollection<Record>;

  constructor(private afs: AngularFirestore) {
    this.record_Collection = this.afs.collection<Record>("record");
    this.record = this.record_Collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  get_account(): Observable<Record[]> {
    return this.record;
  }

  get_account_By_Id(id: string): Observable<Record> {
    return this.record_Collection
      .doc<Record>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(record => {
          record.id = id;
          return record;
        })
      );
  }

  add_account(Record: Record): Promise<DocumentReference> {
    return this.record_Collection.add(Record);
  }

  update_account(Record: Record): Promise<void> {
    return this.record_Collection.doc(Record.id).update({
      account_id: Record.account_id,
      date_record: Record.date_record,
      list_record: Record.list_record,
      money_record: Record.money_record,
      note_record: Record.note_record,
      type_record: Record.type_record,
      user_id: Record.user_id,
      user_name: Record.user_name
    });
  }

  delete_account(id: string): Promise<void> {
    return this.record_Collection.doc(id).delete();
  }
}
