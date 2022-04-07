import { environment } from './../../environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterEvent } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup =  this.fb.group({
    userid: ['', Validators.required],
      password: ['', Validators.required],
  });

  constructor(private router: Router,private fb: FormBuilder,private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe(res => {

      if (res['success'] == 1) {
        switch (res['role']) {
          case 1: {
            this.router.navigate(['/dashboard/admin']);
            break;
          }
          case 2: {
            this.router.navigate(['/dashboard/employee']);
            break;
          }


          default: {

            alert('please give valid inputs.1');
            break;
          }

        }

      } else {
        alert('please give valid inputs.2');
      }

    });
  }

}
