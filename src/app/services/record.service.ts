import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Record {
  id?: string;
  account_id: string;
  account_name: string;
  user_record: any[];
}
// ไปคอมเม้นมาทุกส่วน
@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private record: Observable<Record[]>;
  private record_Collection: AngularFirestoreCollection<Record>;

  constructor(private afs: AngularFirestore) {
    this.record_Collection = this.afs.collection<Record>('record');
  }

  // Function get_record
  // create by : kittisak noidonpai
  // จะทำการคืนค่า record ทั้งหมดในที่อยู่ในฐานข้อมูล
  get_record(): Observable<Record[]> {
    return this.record = this.record_Collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Function get_record_By_Id
  // create by : kittisak noidonpai
  // จะทำการคืนค่า record ตาม id ที่ทำการส่งเข้ามา
  get_record_By_Id(id: string): Observable<Record> {
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

  // Function add_record
  // create by : kittisak noidonpai
  // จะทำการ บันทึกข้อมูลของ record ลงใน firestore
  add_record(Record: Record): Promise<DocumentReference> {
    return this.record_Collection.add(Record);
  }

  // Function update_record
  // create by : kittisak noidonpai
  // จะทำการ เปลี่ยนข้อมูลของ record ตาม id ใน firestore
  update_record(Record: Record): Promise<void> {
    return this.record_Collection.doc(Record.id).update({
      account_id: Record.account_id,
      account_name: Record.account_name,
      user_record: Record.user_record
    });
  }

  // Function delete_record
  // create by : kittisak noidonpai
  // จะทำการ ลบข้อมูลของ record ตาม id ใน firestore
  delete_record(id: string): Promise<void> {
    return this.record_Collection.doc(id).delete();
  }
}
