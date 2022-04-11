import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private authservice: AuthService) { }
  public user_id: any;
  public user_name: any;
  public role :any;
  ngOnInit(): void {
    let user = this.authservice.currentUser;
    this.user_id = user.userid;
    this.user_name= user.user_name;
    this.role=user.role
    console.log(user.user_name);
  }

}
