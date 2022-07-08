import { Component, ElementRef, OnInit , ViewChild } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm : FormGroup =  this.fB.group({
    name :['',[Validators.required]],
    //name : ['',[Validators.required]],
    user_id : [''],
    dept_code: [''],
    mobile_no : [''],
    email_id : ['',Validators.email],
    //mobile_no : ['',[Validators.required, Validators.pattern('^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$')]],
    //email_id : ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    dept_name : [''],
    emp_type : [''],
    emp_type_id : [''],
    machine_ip : [''],
    //design_id : [''],
    //design_type : [''],
    //work_order_no : [''],
    //work_order_validity : [''],
    joining_date : [''],
    resigning_date : [''],
    //project_no : [''],
    address : [''],
    ol_location : [''],
    action : ['']
  })


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  displayedColumns: string[] = ['sn', 'name', 'dept_name', 'mobile_no', 'email_id', 'machine_ip','action'];

  constructor(private fB : FormBuilder,private cms : CommonService, private datePipe : DatePipe,private http: HttpClient) { }

  public department: any = [];
  dataSource: any = [];
  user_data: any = [];
  public x : any = 0;
  public emp : any = [];
  public designation : any = [];
  public folder_location:any='';
  ol :any='';
  temp_file:any='';

  selectedType = '' ;

  onChange(event :any) {
    this.selectedType = event;
    console.log(this.selectedType);
  }

  selectOfferLetter(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ol = file;
      this.folder_location = './uploads/' + 'offer_letter' + '/';
      console.log('environment.rootUrl+upload+/file');
  
  
    }
    const formData = new FormData();
    formData.append('file', this.ol);
    formData.append('folder_name', this.folder_location);
  
    this.http.post<any>(environment.rootUrl+'upload'+'/file', formData).subscribe(res => {
      console.log(res);
      this.temp_file = res;
      console.log(this.temp_file.path);
  
      this.userForm.patchValue({
       ol_location: this.temp_file.filepath,
      }
  
    );
    console.log(this.userForm.value.ol_location)
  
    }); 
  
  }

  onSubmit(){
    this.userForm.patchValue({
      joining_date : this.datePipe.transform(this.userForm.get("joining_date")?.value, "yyyy-MM-dd"),
      resigning_date : this.datePipe.transform(this.userForm.get("resigning_date")?.value, "yyyy-MM-dd"),
    })
    console.log("Just checking",this.userForm.value);
    if(this.x==0) {
    this.cms.saveDetails('users',this.userForm.value).subscribe((res:any) => {
      console.log("Posting",res);
      if (res['affectedRows']) {
         this.getUserDetails();
         this.userForm.reset();
         this.userForm.controls['ol_location'].setValue('');
         Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

      }
    });
    }
    else
    {
      this.cms.updateFunction('user',this.userForm.value).subscribe((res:any) => {
        console.log("updating",res);
        if (res['affectedRows']) {
           this.getUserDetails();
           this.userForm.reset();
           this.userForm.value.ol_location=null;
           this.x=0;
           Swal.fire({ icon: 'success', text: "Updated Successfully.", timer: 2000 });

        }
      });

    }
  }
 public temp: any = []
  onEdit(user_id:any) {
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
    this.cms.getFunction('user').subscribe((res: any)=>{
      //console.log("result of response is res",res);
      //console.log("res length",res.length);
      for(let i=0;i<res.length;i++){
        if(res[i].user_id==user_id){
          console.log("res i is ",res[i]);
          this.temp=res[i];
        }
      }
      console.log("result of id dept data is",this.temp);
      this.userForm.patchValue({
      name: this.temp.name,
      user_id : this.temp.user_id,
      dept_code:this.temp.dept_code,
      emp_type_id : this.temp.emp_type_id,
      emp_type : this.temp.emp_type,
      //design_id : this.temp.design_id,
      //design_type : this.temp.design_type,
      //work_order_no : this.temp.work_order_no,
      //work_order_validity : this.temp.work_order_validity,
      joining_date : this.temp.doj,
      resigning_date : this.temp.resigning_date,
      //project_no : this.temp.project_no,
      mobile_no:this.temp.mobile_no,
      dept_name: this.temp.dept_name,
      email_id: this.temp.email_id,
      address: this.temp.address,
      machine_ip : this.temp.machine_ip,
      ol_location : this.temp.ol_location
      })
      console.log("Which ID is this :" ,user_id);
      console.log("Stock Update insert ID is :" ,this.userForm.value.insertId);
      console.log("Indide stock update form", this.userForm.value);
    });
  }


  getDepartment() {
    this.cms.getFunction('dept').subscribe((res:any) => {
      this.department= res;
      console.log(this.department);

    });
  }

  getEmpType() {
    this.cms.getFunction('emp').subscribe((res:any) => {
      this.emp= res;
      console.log(this.emp);

    });
  }

  getDesignType() {
    this.cms.getFunction('design').subscribe((res:any) => {
      this.designation= res;
      console.log(this.designation);

    });
  }

  getUserDetails() {
    this.cms.getFunction('user').subscribe((res: any) => {

      if (res.length) {
        this.user_data = res;
        this.dataSource = new MatTableDataSource(this.user_data);
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

  // scrollToTop(){

  //    document.body.scrollTop = document.documentElement.scrollTop = 0;
  //    console.log("trial");
  //  }



  ngOnInit(): void {
    this.getDepartment();
    this.getUserDetails();
    this.getEmpType();
    this.getDesignType();
  }

}
