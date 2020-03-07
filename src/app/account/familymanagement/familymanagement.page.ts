import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-familymanagement',
  templateUrl: './familymanagement.page.html',
  styleUrls: ['./familymanagement.page.scss'],
})
export class FamilymanagementPage implements OnInit {
  Name = ["Namhokss","Chomphunut","Mint","Ice"];

  constructor(public navCtrl: NavController, private router: Router) { }


  ngOnInit() {
  }

  //  Function: back กด icon ย้อนกลับ เพื่อไปยังหน้า showaccount
  //  Name: Chomphunut 
  //  Date: 6/3/20
  back() {
    this.router.navigate(['showaccount'], { replaceUrl: true });
  }

  //  Function: logout กด icon ออกจากระบบ เพื่อไปยังหน้า login
  //  Name: Chomphunut 
  //  Date: 6/3/20
  logout() {
    this.router.navigate(['login'], { replaceUrl: true });
  }

  //  Function: delete กดเพื่อลบรายชื่อจาก List Shared with 
  //  Name: Chomphunut 
  //  Date: 7/3/20
  delete(name:string) {
    let index = this.Name.indexOf(name)
    //console.log(index)
    this.Name.splice(index, 1);
   }
}
