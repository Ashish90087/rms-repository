import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  deptForm : FormGroup =  this.fB.group({
    dept_code: [''],
    remarks : [''],
    dept_name :['']
  })
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  displayedColumns: string[] = ['sn', 'dept_name', 'remarks','action'];
  constructor(private fB : FormBuilder,private cms : CommonService) { }
  public department: any = [];
  dataSource: any = [];
  x:any=[];

  onSubmit(){
    //console.log(this.testForm.value);
    if(this.x==0){
    this.cms.saveDetails('dept',this.deptForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getDeptDetails();
         this.deptForm.reset();
         Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

      }
    });
  }
  else
  {
    this.cms.updateFunction('dept',this.deptForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getDeptDetails();
         this.deptForm.reset();
         this.x=0;
         Swal.fire({ icon: 'success', text: "Updated Successfully.", timer: 2000 });

      }
    });

  }

  }

  getDeptDetails() {
        this.cms.getFunction('users').subscribe((res: any) => {

        if (res.length) {
          this.department = res;
          this.dataSource = new MatTableDataSource(this.department);
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
    this.getDeptDetails();
  }

  public temp: any = []
  onEdit(dept_code:any) {
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
    this.cms.getFunction('users').subscribe((res: any)=>{
      //console.log("result of response is res",res);
      //console.log("res length",res.length);
      for(let i=0;i<res.length;i++){
        if(res[i].dept_code==dept_code){
          console.log("res i is ",res[i]);
          this.temp=res[i];
        }
      }
      console.log("result of id dept data is",this.temp);
      this.deptForm.patchValue({
      dept_code: this.temp.dept_code,
      dept_name : this.temp.dept_name,
      remarks:this.temp.remarks

      })
    });
  }

}