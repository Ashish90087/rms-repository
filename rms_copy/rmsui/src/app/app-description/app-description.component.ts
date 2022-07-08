import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-app-description',
  templateUrl: './app-description.component.html',
  styleUrls: ['./app-description.component.scss']
})
export class AppDescriptionComponent implements OnInit {

  projectForm : FormGroup =  this.fB.group({
    app_id: [''],
    app_name:[''],
    app_details : [''],
    start_date :['']
  })
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  displayedColumns: string[] = ['sn', 'app_name', 'start_date','app_details','action'];
  constructor(private fB : FormBuilder,private cms : CommonService,private datePipe : DatePipe) { }
  public department: any = [];
  dataSource: any = [];
  app_data:any=[];
  project_details:any=[];
  x:any=[];

  onSubmit(){
    console.log(this.projectForm.value);
    this.projectForm.patchValue({
      start_date : this.datePipe.transform(this.projectForm.get("start_date")?.value, "yyyy-MM-dd")
     
    })
    if(this.x==0){
    this.cms.saveDetails('project',this.projectForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getProjectDetails();
         this.projectForm.reset();
         Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

      }
    });
  }
  else
  {
    this.cms.updateFunction('project',this.projectForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getProjectDetails();
         this.projectForm.reset();
         this.x=0;
         Swal.fire({ icon: 'success', text: "Updated Successfully.", timer: 2000 });

      }
    });

  }

  }

  getApplication() {
    this.cms.getFunction('app_info').subscribe((res:any) => {
      this.app_data= res;
     console.log(this.app_data);

    });
  }

  getProjectDetails() {
        this.cms.getFunction('project').subscribe((res: any) => {

        if (res.length) {
          this.project_details = res;
          this.dataSource = new MatTableDataSource(this.project_details);
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
    this.getProjectDetails();
    this.getApplication();
  }

  ngAfterViewInit(){
    this.projectForm.get('app_id')?.reset();
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
    this.cms.getFunction('project').subscribe((res: any)=>{
      //console.log("result of response is res",res);
      //console.log("res length",res.length);
      for(let i=0;i<res.length;i++){
        if(res[i].app_id==app_id){
          console.log("res i is ",res[i]);
          this.temp=res[i];
        }
      }
      console.log("result of id dept data is",this.temp);
      this.projectForm.patchValue({
      app_id: this.temp.app_id,
      app_name : this.temp.app_name,
      start_date:this.temp.start_date,
      app_details:this.temp.app_details

      })
    });
  }

}
