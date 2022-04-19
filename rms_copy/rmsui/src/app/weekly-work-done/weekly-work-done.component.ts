import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weekly-work-done',
  templateUrl: './weekly-work-done.component.html',
  styleUrls: ['./weekly-work-done.component.scss']
})
export class WeeklyWorkDoneComponent implements OnInit {

  taskForm : FormGroup =  this.fB.group({
    week: this.fB.group({
      start: [''],
      end : ['']
  }),
    user_id: [''],
    work_detail: this.fB.array([])

  })
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  displayedColumns: string[] = ['sn', 'dept_name', 'remarks','action'];
  constructor(private fB : FormBuilder,private cms : CommonService,private authservice: AuthService) { }
  public department: any = [];
  dataSource: any = [];
  public app_data: any = [];
  x:any=[];
  data : any;
  temp1 : any;
  temp2 : any;
  public userid: any;
  public user_name: any;
  public role :any;

  work_detail() : FormArray {
    return this.taskForm.get("work_detail") as FormArray
  }

  newWorkDetail(): FormGroup {
    return this.fB.group({
      app_id :'',
    work_done : ''
    })
  }

  addNew() {
    this.work_detail().push(this.newWorkDetail());
  }

  removeNew(i:number) {
    this.work_detail().removeAt(i);
  }



  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    console.log(dateRangeStart.value);
    this.temp1 =dateRangeStart.value;
    console.log(dateRangeEnd.value);
    this.temp2 =dateRangeEnd.value;
    //this.taskForm.value.week =this.temp1+'-'+this.temp2;
    this.taskForm.value.week.start=this.temp1;
    this.taskForm.value.week.end=this.temp2;
    console.log(this.taskForm.value);
    this.taskForm.value.week = this.taskForm.value.week.start+'-'+this.taskForm.value.week.end
  }


  onSubmit(){

    // this.taskForm.patchValue({
    //   work_order_from : this.datePipe.transform(this.empForm.get("work_order_from")?.value, "yyyy-MM-dd"),
    //   work_order_to : this.datePipe.transform(this.empForm.get("work_order_to")?.value, "yyyy-MM-dd"),
    // })
    console.log(this.taskForm.value.user_id);
    let d:any=[];
    this.data=this.taskForm.value;
    console.log("i am here");
    console.log(this.data);
    for(let i=0;i<this.data.work_detail.length;i++){

      // console.log({"dept_code": this.data.dept_code, "project_no":this.data.project_no,
      // "project_name":this.data.project_name, "vendor_id":this.data.vendor_id,"work_order_no" : this.data.work_order_no ,
      //  "work_order_location" : this.data.work_order_location , "design_id": this.data.work_order[i].design_id,
      //  "work_order_from": this.data.work_order[i].work_order_from , "work_order_to" : this.data.work_order[i].work_order_to,
      //  "pi" : this.data.pi , "pi_location":this.data.pi_location, "pef_location":this.data.pef_location,
      //  "pef": this.data.pef })



     this.cms.saveDetails('task',{"user_id" : this.data.user_id , "start":this.data.week.start,"end":this.data.week.end, "app_id": this.data.work_detail[i].app_id,
      "work_done": this.data.work_detail[i].work_done }).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         //this.getEmpDetails();
         this.taskForm.reset();
         Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

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


    getApplication() {

        this.cms.getFunction('task' +"/"+this.taskForm.value.user_id).subscribe((res:any) => {
          this.app_data= res;
       //   console.log(this.hospital);
         // this.disabledropdown = false;
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
    let user = this.authservice.currentUser;
    this.taskForm.patchValue({
      user_id : user.userid
     } )

    this.user_name= user.user_name;
    this.role=user.role
    console.log(user.user_name);
    console.log(this.taskForm.value.user_id);
    this.getApplication();
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
      this.taskForm.patchValue({
      dept_code: this.temp.dept_code,
      dept_name : this.temp.dept_name,
      remarks:this.temp.remarks

      })
    });
  }

}
