import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup ,  FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  empForm : FormGroup =  this.fB.group({
    name : [''],
    dept_code : [''],
    project_no : [''],
    project_name : [''],
    vendor_id : [''],
    work_order_no : [''],
    work_order_location : [''],
   // work_order_from : [''],
    //work_order_to : [''],
    pi : [''],
    pi_location : [''],
    pef : [''],
    pef_location : [''],
    work_order: this.fB.array([]) ,
  })

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['sn', 'project_no',  'project_name', 'work_order', 'woPDF',  'pi','pi_pdf',  'pef','pef_pdf' ];

  constructor(private fB : FormBuilder,private cms : CommonService ,private datePipe : DatePipe,private http: HttpClient) { }

  dataSource: any = [];
  designation: any=[];
  department : any=[];
  temp:any=[];
  temp2:any=[];
  vendor : any=[];
  user_data: any = [];
  work_data: any =[];
  data : any;
  wo: any;
  pi: any;
  pef: any;
  temp_file :any;
  folder_location:any;

  work_order() : FormArray {
    return this.empForm.get("work_order") as FormArray
  }

  newWorkOrder(): FormGroup {
    return this.fB.group({
      design_id : '',
      work_order_from: '',
      work_order_to: '',
    })
  }

  addNew() {
    this.work_order().push(this.newWorkOrder());
  }

  removeNew(i:number) {
    this.work_order().removeAt(i);
  }


  onSubmit(){
    // this.temp=this.empForm.get('work_order.0.work_order_from')?.value;
    // console.log("lets see",this.temp);
    // this.temp2=this.datePipe.transform(this.temp,"yyyy-MM-dd");
    // console.log("ab dekhte",this.temp2);
     
    
    this.cms.saveDetails('workorder',this.empForm.value).subscribe((res:any) => {
      //console.log(res);
    });
    
    
    for(let i=0;i<this.empForm.value.work_order.length;i=i+1){
    
    this.data=this.empForm.value;
    console.log("data",this.data);

     this.cms.saveDetails('wodetails',{"work_order_no" : this.data.work_order_no , "design_id": this.data.work_order[i].design_id,
      "work_order_from": this.datePipe.transform(this.data.work_order[i].work_order_from,"yyyy-MM-dd") , "work_order_to" : this.datePipe.transform(this.data.work_order[i].work_order_to,"yyyy-MM-dd") }).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getEmpDetails();
         this.empForm.reset();
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

selectWorkOrder(event:any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.wo = file;
    this.folder_location = './uploads/' + 'work_order' + '/';
    console.log('environment.rootUrl+upload+/file');


  }
  const formData = new FormData();
  formData.append('file', this.wo);
  formData.append('folder_name', this.folder_location);

  this.http.post<any>(environment.rootUrl+'upload'+'/file', formData).subscribe(res => {
    console.log(res);
    this.temp_file = res;
    console.log(this.temp_file.path);

    this.empForm.patchValue({
     work_order_location: this.temp_file.filepath,
    }

  );
  console.log(this.empForm.value.work_order_location)

  });


}


selectPI(event:any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.pi = file;
    this.folder_location = './uploads/' + 'pi' + '/';

  }
  const formData = new FormData();
  formData.append('file', this.pi);
  formData.append('folder_name', this.folder_location);

  this.http.post<any>(environment.rootUrl+'upload'+'/file', formData).subscribe(res => {
    console.log(res);
    this.temp_file = res;
    console.log(this.temp_file.path);

    this.empForm.patchValue({
     pi_location: this.temp_file.filepath,
    }
  );

  });

}

selectPEF(event:any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.pef = file;
    this.folder_location = './uploads/' + 'pef' + '/';

  }
  const formData = new FormData();
  formData.append('file', this.pef);
  formData.append('folder_name', this.folder_location);

  this.http.post<any>(environment.rootUrl+'upload'+'/file', formData).subscribe(res => {
    console.log(res);
    this.temp_file = res;
    console.log(this.temp_file.path);

    this.empForm.patchValue({
     pef_location: this.temp_file.filepath,
    }
  );

  });


}

woPDF(work_order_location:any){
  console.log("I am WO PDF");
  console.log(work_order_location)
const url= (environment.rootUrl + work_order_location );
window.open(url);
//console.log(url);

}

piPDF(pi_location:any){
  const url= (environment.rootUrl + pi_location );
  window.open(url);
}

pefPDF(pef_location:any){
  const url= (environment.rootUrl + pef_location );
  window.open(url);
}

getDepartment() {
  this.cms.getFunction('dept').subscribe((res:any) => {
    this.department= res;
    console.log(this.department);

  });
}

getDesignType() {
  this.cms.getFunction('design').subscribe((res:any) => {
    this.designation= res;
    console.log(this.designation);

  });
}

getVendor() {
  this.cms.getFunction('vendor').subscribe((res:any) => {
    this.vendor= res;

  });
}

getEmpDetails() {
  this.cms.getFunction('workorder').subscribe((res: any) => {
    console.log(res)

    if (res.length) {
      this.work_data = res;
      this.dataSource = new MatTableDataSource(this.work_data);
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

  ngOnInit(): void {
    
   // this.getUser();
    //this.getUser();
    this.getDesignType();
    this.getEmpDetails();
    this.getDepartment();
    this.getVendor();
  }

}
