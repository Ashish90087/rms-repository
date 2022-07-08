import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import Swal from 'sweetalert2';
import * as CryptoJs from 'crypto-js';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  userData: any; //store token data
  public userid: any;
  public user_name: any;
  public role :any;
  constructor(private fB: FormBuilder, private helper: JwtHelperService, private cm: CommonService, private authService: AuthService) {
    
   }

  ngOnInit(): void {
    let user = this.authService.currentUser;
    console.log("lets see",user);
    this.changepass.patchValue({
      user_id : user.userid
     } )

    this.user_name= user.user_name;
    this.role=user.role
    console.log(user.user_name);
    console.log(this.changepass.value.user_id);
  }

  //Change Password
  checkPassword: boolean = false;
  redIcon: boolean = false;
  greenIcon: boolean = false;

  changepass: FormGroup = this.fB.group({
    user_id: [''],
    Password: ['', [Validators.required]],
    New_Password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    confirmPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
  });

  changePassword() {
    let user = this.authService.currentUser;
    console.log("lets see",user);
    this.changepass.patchValue({
      user_id : user.userid
     } )
    // this.changepass.patchValue({ user_id: `${this.userData.user_id}` });
    // console.log("Check Userid",this.userData.user_id);
    if (this.changepass.valid) {
      // var password = CryptoJs.AES.encrypt(this.changepass.get('Password')?.value, environment.encryptionKey).toString();
      //   this.changepass.patchValue({ Password: `${password}` });
      //   console.log(this.changepass.value.Password);
      this.changepass.get('confirmPassword')?.reset();
        var new_password = CryptoJs.AES.encrypt(this.changepass.get('New_Password')?.value, environment.encryptionKey).toString();
        // this.changepass.patchValue({ New_Password: `${new_password}` })
        this.changepass.value.New_Password = new_password;
        
      this.cm.updateFunction('password', this.changepass.value).subscribe((res: any) => {
        console.log('res******', res);
        
        console.log("dekhte hain",this.changepass.value);
        if (res.success) {
          Swal.fire({ icon: 'success', text: "Password Changed", timer: 1000 });
          this.changepass.reset();
          this.authService.logout();
          location.reload();
        } else {
          Swal.fire({ icon: 'error', text: "Wrong UserID or Password", timer: 1000 });
          this.checkPassword = false;
          this.greenIcon = false;
          this.redIcon = false;
          this.changepass.reset();
        }
      })
    }

  }

  matchPass(n: string, m: string) {
    if (n != m) this.redIcon = true;
    else this.redIcon = false;
    if (n == m) {
      this.greenIcon = true;
      this.checkPassword = true
    } else {
      this.greenIcon = false;
      this.checkPassword = false
    }
  }


}
