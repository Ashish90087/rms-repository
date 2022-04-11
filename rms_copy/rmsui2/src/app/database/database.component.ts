import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  dbForm : FormGroup =  this.fB.group({
    db_name : [''],
    db_id : [''],
    db_type : [''],
    dept_code: [''],
    server_ip: [''],
    server_id: [''],
    app_id : [''],
    app_name : [''],
    dept_name : [''],
    user_id : [''],
    name : [''],
    action : ['']
  })

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  displayedColumns: string[] = ['sn', 'db_name', 'db_type', 'app_name', 'dept_name', 'name' ,'action'];

  constructor(private fB : FormBuilder,private cms : CommonService) { }

  public department: any = [];
  dataSource: any = [];
  user_data: any = [];
  app_data: any = [];
  db_data : any = [];
  db_detail : any =[];
  server_data:any=[];
  x : any = []

  onSubmit(){
    //console.log(this.testForm.value);
    if(this.x==0){
    this.cms.saveDetails('db',this.dbForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getDatabaseDetails();
         this.dbForm.reset();
         Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

      }
    });
  }
  else
  {
    this.cms.updateFunction('db',this.dbForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getDatabaseDetails();
         this.dbForm.reset();
         this.x=0;
         Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

      }
    });

  }

  }

  getDepartment() {
    this.cms.getFunction('dept').subscribe((res:any) => {
      this.department= res;
      console.log(this.department);

    });
  }

  getDBType() {
    this.cms.getFunction('dbtype').subscribe((res:any) => {
      this.db_detail= res;
      console.log(this.department);

    });
  }

  getApplication() {
    this.cms.getFunction('app_info').subscribe((res:any) => {
      this.app_data= res;
     // console.log(this.department);

    });
  }

  getServer() {
    this.cms.getFunction('server').subscribe((res:any) => {
      this.server_data= res;

    });
  }

  getUser() {
    this.cms.getFunction('user_info').subscribe((res:any) => {
      this.user_data= res;

    });
  }

  getDatabaseDetails() {
    this.cms.getFunction('db').subscribe((res: any) => {
      console.log(res);
      if (res.length) {
        this.db_data = res;
        this.dataSource = new MatTableDataSource(this.db_data);
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
  onEdit(db_id:any) {
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
    this.cms.getFunction('db').subscribe((res: any)=>{
      //console.log("result of response is res",res);
      //console.log("res length",res.length);
      for(let i=0;i<res.length;i++){
        if(res[i].db_id==db_id){
          console.log("res i is ",res[i]);
          this.temp=res[i];
        }
      }
      console.log("result of id dept data is",this.temp);
      this.dbForm.patchValue({
      db_id: this.temp.db_id,
      db_name: this.temp.db_name,
      user_id: this.temp.user_id,
      name : this.temp.name,
      db_type: this.temp.db_type,
      app_id: this.temp.app_id,
      app_name: this.temp.app_name,
      server_id: this.temp.server_id,
      server_ip: this.temp.server_ip,
      dept_code: this.temp.dept_code,
      dept_name : this.temp.dept_name


      })
    });
  }



  ngOnInit(): void {
    this.getDepartment();
    this.getUser();
    this.getApplication();
    this.getDatabaseDetails();
    this.getServer();
    this.getDBType();
  }

}
