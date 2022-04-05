import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  appForm : FormGroup =  this.fB.group({
    app_name : [''],
    app_id : [''],
    url : [''],
    plateform_id: [''],
    platform_version :[''],
    server_id:[''],
    server_ip: [''],
    public_ip : [''],
    dept_name : [''],
    dept_code : [''],
    ssl_expiry : [''],
    action : ['']

  })

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  displayedColumns: string[] = ['sn', 'app_name', 'plateform', 'server', 'public ip',  'department' ,'url', 'action'];

  constructor(private fB : FormBuilder,private datePipe : DatePipe,private cms : CommonService) { }

  public department: any = [];
  dataSource: any = [];
  user_data: any = [];
  plateform: any =[];
  app_data: any =[];
  server_data : any =[];
  x : any = []

  onSubmit(){
    //console.log(this.testForm.value);
    this.appForm.patchValue({
      work_order_from : this.datePipe.transform(this.appForm.get("ssl_expiry")?.value, "yyyy-MM-dd")
      })
    if(this.x==0){
    this.cms.saveDetails('apps',this.appForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getAppDetails();
         this.appForm.reset();
         Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

      }
    });
  }

  else
  {
    this.cms.updateFunction('apps',this.appForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getAppDetails();
         this.appForm.reset();
         this.x=0;
         Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

      }
    });
  }

 }



//  getUser() {
//   this.cms.getFunction('user_info').subscribe((res:any) => {
//     this.user_data= res;

//   });
// }

getPlateform() {
  this.cms.getFunction('plateform_info').subscribe((res:any) => {
    this.plateform= res;

  });
}

getServer() {
  this.cms.getFunction('server').subscribe((res:any) => {
    this.server_data= res;

  });
}

getDepartment() {
  this.cms.getFunction('dept').subscribe((res:any) => {
    this.department= res;
    console.log(this.department);

  });
}

getAppDetails() {
  this.cms.getFunction('apps').subscribe((res: any) => {
    console.log(res)

    if (res.length) {
      this.app_data = res;
      this.dataSource = new MatTableDataSource(this.app_data);
      this.dataSource.paginator = this.paginator;
    }
  });
}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public temp: any = []
  onEdit(app_id:any) {
    // window.scroll({ top: 0, left: 0});
  //  this.scroll.nativeElement.scrollTop=this.scroll.nativeElement.scrollHeight;
   this.scroll.nativeElement.scrollIntoView();
    // let body={
    //   dept_id: dept_id,
    //   user_id:user_id,
    //   cpu_sno:cpu_sno
    // }
    this.x=1;

    //console.log("Which ID is this :" ,this.dataSource.affectedRows);
    //console.log("Stock Update insert ID is :" ,this.stockForm.value.insertId);
    this.cms.getFunction('apps').subscribe((res: any)=>{
      //console.log("result of response is res",res);
      //console.log("res length",res.length);
      for(let i=0;i<res.length;i++){
        if(res[i].app_id==app_id){
          console.log("res i is ",res[i]);
          this.temp=res[i];
        }
      }
      console.log("result of id dept data is",this.temp);
      this.appForm.patchValue({
      app_id: this.temp.app_id,
      app_name : this.temp.app_name,
      url:this.temp.url,
      plateform_id:this.temp.plateform_id,
      platform_version:this.temp.platform_version,
      server_id : this.temp.server_id,
      server_ip : this.temp.server_ip,
      public_ip : this.temp.public_ip,
      dept_name : this.temp.dept_name,
      dept_code : this.temp.dept_code,
      ssl_expiry : this.temp.exp

      })
    });
  }

  ngOnInit(): void {
    this.getDepartment();
    this.getPlateform();
   // this.getUser();
    this.getAppDetails();
    this.getServer();
  }

}


