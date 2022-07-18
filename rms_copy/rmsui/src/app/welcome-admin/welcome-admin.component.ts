import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-welcome-admin',
  templateUrl: './welcome-admin.component.html',
  styleUrls: ['./welcome-admin.component.scss']
})
export class WelcomeAdminComponent implements OnInit {
  

  constructor( private authservice: AuthService,private cms : CommonService) { }
  public user_id: any;
  public user_name: any;
  public app_count :any;
  public emp_count :any;
  public server_count :any;
  public db_count :any;
  public stock_count :any;
  public ssl_count:any;
  public ssl_prior:any;
  public stock_issued: any;
  public stock_returned: any;

  getAppCount() {
    this.cms.getFunction('appcount').subscribe((res:any) => {
      console.log(res);
      this.app_count= res[0].x;
    });
  }

  getEmpCount() {
    this.cms.getFunction('empcount').subscribe((res:any) => {
      console.log(res);
      this.emp_count= res[0].x;
    });
  }

  getServerCount() {
    this.cms.getFunction('servercount').subscribe((res:any) => {
      console.log(res);
      this.server_count= res[0].x;
    });
  }

  getDbCount() {
    this.cms.getFunction('dbcount').subscribe((res:any) => {
      console.log(res);
      this.db_count= res[0].x;
    });
  }

  getStockCount() {
    this.cms.getFunction('stockcount').subscribe((res:any) => {
      console.log(res);
      this.stock_count= res[0].x;
    });
  }
  getIssuedCount() {
    this.cms.getFunction('stockIssuedCount').subscribe((res:any) => {
      console.log("stocks issued",res);
      this.stock_issued= res[0].x;
    });
  }
  getReturnedCount() {
    this.cms.getFunction('stockReturnedCount').subscribe((res:any) => {
      console.log(res);
      this.stock_returned= res[0].x;
    });
  }

  getSslCount() {
    this.cms.getFunction('sslcount').subscribe((res:any) => {
      console.log(res);
      this.ssl_count= res[0].x;
    });
  }

  getSslPriorCount() {
    this.cms.getFunction('sslPriorCount').subscribe((res:any) => {
      console.log(res);
      this.ssl_prior= res[0].x;
    });
  }

  ngOnInit(): void {
    let user = this.authservice.currentUser;
    this.user_id = user.userid;
    this.user_name= user.user_name;
    console.log(user.user_name);
    this.getAppCount();
    this.getEmpCount();
    this.getServerCount();
    this.getDbCount();
    this.getStockCount();
    this.getSslCount();
    this.getSslPriorCount();
    this.getIssuedCount();
    this.getReturnedCount();

  }
}
