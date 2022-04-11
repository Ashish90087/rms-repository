import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private authservice: AuthService,) { }
  public user_id: any;
  public user_name: any;
  ngOnInit(): void {
    let user = this.authservice.currentUser;
    this.user_id = user.userid;
    this.user_name= user.user_name;
    console.log(user.user_name);

  }



}
