import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterDirective } from 'mat-table-exporter';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-app-report',
  templateUrl: './app-report.component.html',
  styleUrls: ['./app-report.component.scss']
})
export class AppReportComponent implements OnInit {

  appReportForm : FormGroup =  this.fB.group({
    app_id: [''],
    dept_code: [''],
    dept_name :[''],
    plateform_id: [''],
    app_name:[''],
    app_details : [''],
    start_date :['']
  })
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;

  displayedColumns: string[] = ['sn', 'app_name', 'plateform', 'server', 'public ip',  'department' ,'url', 'ssl_expiry'];

  constructor(private fB : FormBuilder,private cms : CommonService,private datePipe : DatePipe) { }
  public department: any = [];
  dataSource: any = [];
  app_data:any=[];
  platform:any=[];
  project_details:any=[];
  x:any=[];

  selected = '' ;
  selectedType = '';

  // onChange(event :any) {
  //   this.selected = event.source.triggerValue;
  //   console.log(this.selected);
    
  // }

  getDept(event:any) {
    this.selected = event.value;
    console.log(event.value);
    if(this.selected=="Y") {
  
      this.cms.getFunction('apps').subscribe((res: any) => {
        console.log(res)
    
        if (res.length) {
          this.app_data = res;
          this.dataSource = new MatTableDataSource(this.app_data);
          this.dataSource.paginator = this.paginator;
        }
      });
   }
  
   else {
  
    this.cms.getFunction('app_report'+"/"+this.appReportForm.value.dept_code).subscribe((res: any) => {
      console.log(res)
  
      if (res.length) {
        this.app_data = res;
        this.dataSource = new MatTableDataSource(this.app_data);
        this.dataSource.paginator = this.paginator;
      }
    });
   }
  
   }

   getApps(event:any) {

    this.cms.getFunction('app_report2'+"/"+this.appReportForm.value.plateform_id).subscribe((res: any) => {
      console.log(res)
  
      if (res.length) {
        this.app_data = res;
        this.dataSource = new MatTableDataSource(this.app_data);
        this.dataSource.paginator = this.paginator;
      }
    });

   }

   getDepartment() {
    this.cms.getFunction('dept').subscribe((res:any) => {
      this.department= res;
      console.log(this.department);
  
    });
  }

  getPlateform() {
    this.cms.getFunction('plateform_info').subscribe((res:any) => {
      this.platform= res;
  
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
   this.getDepartment();
   this.getPlateform();
  } 

}
