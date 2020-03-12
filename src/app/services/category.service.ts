import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Category {
  id?: string;
  record_name_en: string;
  record_name_th: string;
  record_type: number;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private category: Observable<Category[]>;
  private category_Collection: AngularFirestoreCollection<Category>;

  constructor(private afs: AngularFirestore) {
    this.category_Collection = this.afs.collection<Category>('category');
    this.category = this.category_Collection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  get_category(): Observable<Category[]> {
    return this.category;
  }

  get_category_By_Id(id: string): Observable<Category> {
    return this.category_Collection
      .doc<Category>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(list_record => {
          list_record.id = id;
          return list_record;
        })
      );
  }

  add_category(category: Category): Promise<DocumentReference> {
    return this.category_Collection.add(category);
  }

  update_category(category: Category): Promise<void> {
    return this.category_Collection.doc(category.id).update({
      record_name_en: category.record_name_en,
      record_name_th: category.record_name_th,
      record_type: category.record_type,

    });
  }

  delete_category(id: string): Promise<void> {
    return this.category_Collection.doc(id).delete();
  }
}
