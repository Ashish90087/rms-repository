import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-app-sec-audit',
  templateUrl: './app-sec-audit.component.html',
  styleUrls: ['./app-sec-audit.component.scss']
})
export class AppSecAuditComponent implements OnInit {

  // public app_data : any[] | undefined

  appSecAuditForm : FormGroup = this.fb.group({
    app_id:[''],
    security_audit_cleared:[''],
    security_audit_id:[''],
    audit_date:[''],
    application_url:[''],
    remarks:[''],
    server_ip:[''],
    app_name:[''],
    appSecLocation:['']
    
  })
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['sn','app_id', 'security_audit_cleared','server_ip','app_name', 'security_audit_id','audit_date','application_url','remarks','saPDF'];
  
  constructor(private fb:FormBuilder, private cms : CommonService,private datePipe: DatePipe,private http: HttpClient) { }
  public app_data:any=[];
  public data:any=[];
  public server_data:any=[];
  public application_access_list:any=[];
  public dataSource:any=[];
  public sa: any;
  public folder_location:any;
  public temp_file :any;
  // public app_name: string | undefined;
  // public app_id: string | undefined;
  ngOnInit(): void {
    this.getApplications();
    this.getServerList();
    this.refresh();
  }
  getServerList(){
    this.cms.getFunction('mac_acc').subscribe((res:any)=>{
      this.server_data=res;
      console.log("server data is :",this.server_data);
    })
    
  }
  getApplications(){
    this.cms.getFunction('application_access').subscribe((res:any)=>{
      this.application_access_list=res;
      this.app_data=res;
      console.log("Application Access list is :",this.application_access_list);

    })
    
  }

  onSubmit(){
    this.appSecAuditForm.patchValue({
      audit_date: this.datePipe.transform(this.appSecAuditForm.get("audit_date")?.value, "yyyy-MM-dd")
    });
    console.log("entered inside submit")
    console.log("App data are",this.app_data);
    console.log("server data is :",this.server_data );
    this.cms.saveDetails("app_sec_audit_details",this.appSecAuditForm.value).subscribe((res:any)=>{
      console.log("App security audit details are:",res);
      if (res['affectedRows']) {
        this.appSecAuditForm.reset();
        this.refresh();
        Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

     }
    });
    console.log("form details are :",this.appSecAuditForm.value)
    
    this.refresh();
  }
  refresh():void{
    this.cms.getFunction('app_sec_audit_details').subscribe((res:any)=>{
      console.log("now show the security audit details from app_sec_audit",res);
       if(res.length){
         this.data=res;
         this.dataSource=new MatTableDataSource(this.data);
         this.dataSource.paginator=this.paginator;
       }
    })
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  public app_id:any=[];
  public app_name:any=[];

  app_details(app_id:any){
    console.log("Entered APp details")
    console.log("App ID is",app_id);
    console.log("This App ID is",this.app_id);
    console.log("Application data is ",this.app_data);
    for(let i=0;i<this.app_data.length;i++){
      if(app_id==this.app_data[i].app_id){
        //this.was_issued_to= this.user_data[i].name;
        this.app_name = this.app_data[i].app_name;
        
        console.log("App name is : ",this.app_name);
      }

    }
  
  }

  appAuditCert(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.sa = file;
      this.folder_location = './uploads/' + 'SecurityAudit' + '/';

    }
    const formData = new FormData();
    formData.append('file', this.sa);
    formData.append('folder_name', this.folder_location);

    this.http.post<any>(environment.rootUrl+'upload'+'/file', formData).subscribe(res => {
      console.log(res);
      this.temp_file = res;
      console.log(this.temp_file.path);

      this.appSecAuditForm.patchValue({
       appSecLocation: this.temp_file.filepath,
      }

    );
    console.log(this.appSecAuditForm.value.appSecLocation)

    });


  }
  saPDF(appSecLocation:any){
    console.log("I am SA PDF");
    console.log("App Sec Location",appSecLocation)
  //const url= ('http://localhost:3000/' +glocation );
  const url= (environment.rootUrl + appSecLocation );
  window.open(url);
  //console.log(url);

  }

  selectedAppID(app_id :any){

    console.log("app id is ",app_id);
    this.app_id=app_id;
    this.app_details(app_id);
  }


}
