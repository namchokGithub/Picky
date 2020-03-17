// import injectable from angular/core
import { Injectable } from "@angular/core";

// import AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference from angular/fire/firestore
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference
} from "@angular/fire/firestore";

// import map,take from rxjs/operators
import { map, take } from "rxjs/operators";

// import Observable from rxjs
import { Observable } from "rxjs";

// import async from angular/core/testing
import { async } from "@angular/core/testing";

export interface person {
  id?: string;
  account_balance: string;
  account_name: string;
  account_type: string;
  account_user_id: string;
  account_user_name: string;
}

export interface family {
  id?: string;
  account_balance: string;
  account_member: any[];
  account_name: string;
  account_type: string;
}

export interface enterprise {
  id?: string;
  account_balance: string;
  account_name: string;
  account_member: any[];
  account_type: string;
  account_department: string;
}

@Injectable({
  providedIn: "root"
})

// การเรียกใช้ account.service.ts
// import {
//   AccountService,
//   person,
//   family,
//   enterprise
// } from 'src/app/services/account.service';

export class AccountService {
  private account_id: string;
  private account_name: string;

  // account_person valible angular
  private account_person: Observable<person[]>;
  private account_family: Observable<family[]>;
  private account_enterprise: Observable<enterprise[]>;
  // account_person_collection valible angular
  private account_person_collection: AngularFirestoreCollection<person>;
  private account_family_collection: AngularFirestoreCollection<family>;
  private account_enterprise_collection: AngularFirestoreCollection<enterprise>;

  constructor(private afs: AngularFirestore) {
    this.account_person_collection = this.afs.collection<person>("account");
    this.account_family_collection = this.afs.collection<family>("account");
    this.account_enterprise_collection = this.afs.collection<enterprise>(
      "account"
    );
  }

  // Function get_account_person
  // create by : kittisak noidonpai
  // จะทำการคืนค่า acount แบบบุคคล TYPE person
  // ตัวอย่างข้อมูล
  // {
  //    id:"27cJhfAj5rooxMesV8FJ"
  //    account_balance:"0"
  //    account_name:"account_name"
  //    account_type:"Personal"
  //    account_user_id:"user_id"
  //    account_username:"user_name"  
  // }
  // ตัวอย่างการเรียกใช้
  // this.accountService.get_account().subscribe(res => {})
  
  get_account(): Observable<person[]> {
    return (this.account_person = this.account_person_collection
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      ));
  }

  // Function get_account_family
  // create by : kittisak noidonpai
  // จะทำการคืนค่า acount แบบที่ไม่ใข่ส่วนบุคคล TYPE family
  // ตัวอย่างข้อมูล
  // {
  //    id:"27cJhfAj5rooxMesV8FJ"
  //    account_balance:"0"
  //    account_member:[{
  //      id:"nOT94wDxCxye6JwoegpC"
  //      user_id:"ginowasu"
  //      user_name:"จีโน่"    
  //      user_password:"12345678"
  //    }]
  //    account_name:"ginowasu22"
  //    account_type:"Family"
  // }
  // ตัวอย่างการเรียกใช้
  // this.accountService.get_account_family().subscribe(res => {})

  get_account_family(): Observable<family[]> {
    return (this.account_family = this.account_family_collection
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      ));
  }

  // Function get_account_enterprise
  // create by : kittisak noidonpai
  // จะทำการคืนค่า acount แบบที่ไม่ใข่ส่วนบุคคล TYPE enterprise
  // ตัวอย่างข้อมูล
  // {
  //    id:"27cJhfAj5rooxMesV8FJ"
  //    account_balance:"0"
  //    account_member:[{
  //      id:"nOT94wDxCxye6JwoegpC"
  //      user_id:"ginowasu"
  //      user_name:"จีโน่"    
  //      user_password:"12345678"
  //    }]
  //    account_name:"ginowasu22"
  //    account_type:"Enterprise"
  //    account_department: "CEO";
  // }
  // ตัวอย่างการเรียกใช้
  // this.accountService.get_account_enterprise().subscribe(res => {})

  get_account_enterprise(): Observable<enterprise[]> {
    return (this.account_enterprise = this.account_enterprise_collection
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      ));
  }

  // Function get_acount_person_By_Id
  // create by : kittisak noidonpai
  // จะทำการคืนค่า acount_person ตาม id ที่ทำการส่งเข้ามา
  // ตัวอย่างข้อมูล
  // {
  //    id:"27cJhfAj5rooxMesV8FJ"
  //    account_balance:"0"
  //    account_name:"account_name"
  //    account_type:"Personal"
  //    account_user_id:"user_id"
  //    account_username:"user_name"  
  // }
  // ตัวอย่างการเรียกใช้
  // this.accountService.get_acount_person_By_Id(account_id).subscribe(res => {})

  get_acount_person_By_Id(id: string): Observable<person> {
    return this.account_person_collection
      .doc<person>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(account_person => {
          account_person.id = id;
          return account_person;
        })
      );
  }

  // Function get_acount_family_By_Id
  // create by : kittisak noidonpai
  // จะทำการคืนค่า acount_family ตาม id ที่ทำการส่งเข้ามา
  // ตัวอย่างข้อมูล
  // {
  //    id:"27cJhfAj5rooxMesV8FJ"
  //    account_balance:"0"
  //    account_member:[{
  //      id:"nOT94wDxCxye6JwoegpC"
  //      user_id:"ginowasu"
  //      user_name:"จีโน่"    
  //      user_password:"12345678"
  //    }]
  //    account_name:"ginowasu22"
  //    account_type:"Family"
  // }
  // ตัวอย่างการเรียกใช้
  // this.accountService.get_acount_family_By_Id(account_id).subscribe(res => {})

  get_acount_family_By_Id(id: string): Observable<family> {
    return this.account_family_collection
      .doc<family>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(account_family => {
          account_family.id = id;
          return account_family;
        })
      );
  }

  // Function get_acount_enterprise_By_Id
  // create by : kittisak noidonpai
  // จะทำการคืนค่า acount_enterprise ตาม id ที่ทำการส่งเข้ามา
  // ตัวอย่างข้อมูล
  // {
  //    id:"27cJhfAj5rooxMesV8FJ"
  //    account_balance:"0"
  //    account_member:[{
  //      id:"nOT94wDxCxye6JwoegpC"
  //      user_id:"ginowasu"
  //      user_name:"จีโน่"    
  //      user_password:"12345678"
  //    }]
  //    account_name:"ginowasu22"
  //    account_type:"Enterprise"
  //    account_department: "CEO";
  // }
  // ตัวอย่างการเรียกใช้
  // this.accountService.get_acount_enterprise_By_Id(account_id).subscribe(res => {})

  get_acount_enterprise_By_Id(id: string): Observable<enterprise> {
    return this.account_person_collection
      .doc<enterprise>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(account_enterprise => {
          account_enterprise.id = id;
          return account_enterprise;
        })
      );
  }

  // Function add_account_person
  // create by : kittisak noidonpai
  // จะทำการ บันทึกข้อมูลของ account_person ลงใน firestore
  // ตัวอย่างการเรียกใช้
  // this.accountService.add_account_person(account_person)

  add_account_person(person: person): Promise<DocumentReference> {
    return this.account_person_collection.add(person);
  }

  // Function add_account_family
  // create by : kittisak noidonpai
  // จะทำการ บันทึกข้อมูลของ account_person ลงใน firestore
  // ตัวอย่างการเรียกใช้
  // this.accountService.add_account_family(account_family)

  add_account_family(family: family): Promise<DocumentReference> {
    return this.account_family_collection.add(family);
  }

  // Function add_account_enterprise
  // create by : kittisak noidonpai
  // จะทำการ บันทึกข้อมูลของ account_person ลงใน firestore
  // ตัวอย่างการเรียกใช้
  // this.accountService.add_account_enterprise(account_enterprise)

  add_account_enterprise(enterprise: enterprise): Promise<DocumentReference> {
    return this.account_enterprise_collection.add(enterprise);
  }

  // Function update_account_person
  // create by : kittisak noidonpai
  // จะทำการ เปลี่ยนข้อมูลของ account_person ตาม id ใน firestore
  // ตัวอย่างการเรียกใช้
  // this.accountService.add_account_enterprise(account_person)

  update_account_person(person: person): Promise<void> {
    return this.account_person_collection.doc(person.id).update({
      balance: person.account_balance,
      name_account: person.account_name,
      user_id: person.account_user_id,
      user_name: person.account_user_name,
      account_type: person.account_type
    });
  }

  // Function update_account_family
  // create by : kittisak noidonpai
  // จะทำการ เปลี่ยนข้อมูลของ account_person ตาม id ใน firestore
  // ตัวอย่างการเรียกใช้
  // this.accountService.update_account_family(account_family)

  update_account_family(family: family): Promise<void> {
    return this.account_family_collection.doc(family.id).update({
      balance: family.account_balance,
      name_account: family.account_name,
      account_member: family.account_member,
      account_type: family.account_type
    });
  }

  // Function update_account_enteprise
  // create by : kittisak noidonpai
  // จะทำการ เปลี่ยนข้อมูลของ account_person ตาม id ใน firestore
  // ตัวอย่างการเรียกใช้
  // this.accountService.add_account_enterprise(account_enterprise)

  update_account_enteprise(enterprise: enterprise): Promise<void> {
    return this.account_enterprise_collection.doc(enterprise.id).update({
      balance: enterprise.account_balance,
      name_account: enterprise.account_name,
      account_member: enterprise.account_member,
      account_type: enterprise.account_type,
      account_department: enterprise.account_department
    });
  }

  // Function delete_account
  // create by : kittisak noidonpai
  // จะทำการ ลบข้อมูลของ account_person ตาม id ใน firestore
  // ตัวอย่างการเรียกใช้
  // this.accountService.delete_account(account_id)

  delete_account(id: string): Promise<void> {
    return this.account_person_collection.doc(id).delete();
  }

  // Function set_session_account
  // create by : kittisak noidonpai
  // เก็บข้อมูลอย่าง acccount_id และ account_name ไว้ใน services เพื่อให้สามารถเรียกใช้ได้ทุกหน้า
  // ตัวอย่างการเรียกใช้
  // this.accountService.set_session_account(account_id,account_name)

  set_session_account(account_id: string, account_name: string) {
    this.account_id = account_id;
    this.account_name = account_name;
  }

  // Function get_session_account_id
  // create by : kittisak noidonpai
  // คืนค่าข้อมูล acccount_id 
  // ตัวอย่างการเรียกใช้
  // this.accountService.get_session_account_id()

  get_session_account_id() {
    return this.account_id;
  }


  // Function get_session_account_name
  // create by : kittisak noidonpai
  // คืนค่าข้อมูล acccount_name
  // ตัวอย่างการเรียกใช้
  // this.accountService.get_session_account_name()

  get_session_account_name() {
    return this.account_name;
  }
}
