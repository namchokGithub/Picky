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

// ไปคอมเม้นมาทุกส่วน

export class RegisterPage implements OnInit {
  
  private ConfirmPassword: string = "";
  user_add:User = {
    user_name:'',
    user_id:'',
    user_password:'' 
  };
  user: User[]
  constructor(
    public navCtrl: NavController,
    private router: Router,
    private userservice: UserService
  ) {}

  ngOnInit() {
    
    this.userservice.get_user().subscribe(res => {
      console.log(res);
      this.user = res;
    });
  }

  back() {
    this.router.navigate(["login"]);
  }

  confirm_regis() {
    
    if(this.check_username() && this.check_regis()){
      this.userservice.add_user(this.user_add)
      console.log(123)
    }else{
      console.log(234)
    }
  }
  
  check_regis(){
    if(this.user_add.user_name && this.user_add.user_id && this.user_add.user_password){
      if(this.user_add.user_password == this.ConfirmPassword){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }


  check_username() {
    const founc = this.user.find(user => user.user_id === this.user_add.user_id)
    if(!founc){
      return true
    }else{
      return false
    }
  }
}
