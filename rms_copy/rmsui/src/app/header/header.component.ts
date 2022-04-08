import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router,private authservice: AuthService,) {}
  public user_id: any;
  public user_name: any;
  ngOnInit(): void {
    let user = this.authservice.currentUser;
    this.user_id = user.userid;
    this.user_name= user.user_name;
    console.log(user.user_name);
  }

  logout() {
    this.authservice.logout();
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
