import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NavController } from "@ionic/angular";
import { map, count } from "rxjs/operators";
import { UserService, User } from "src/app/services/user.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  private name: string = "";
  private user_id: string = "";
  private password: string = "";
  private ConfirmPassword: string = "";
  user: User[

  ];
  constructor(
    public navCtrl: NavController,
    private router: Router,
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.userservice.get_user().subscribe(res => {
      console.log(res);
      
    });
  }

  back() {
    this.router.navigate(["login"]);
  }

  confirm_regis() {
    
  }
  
 

  check_username() {
    const founc = this.user.find(user => user.user_id === this.user_id)
    if(!founc){
      console.log(true)
    }else{
      console.log(true)
    }
    
  }
}
