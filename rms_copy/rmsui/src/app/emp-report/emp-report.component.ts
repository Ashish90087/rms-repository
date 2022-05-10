import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterDirective } from 'mat-table-exporter';
import jspdf, { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-report',
  templateUrl: './emp-report.component.html',
  styleUrls: ['./emp-report.component.scss']
})
export class EmpReportComponent implements OnInit {

  empReportForm : FormGroup =  this.fB.group({
    name: [''],
    dept_code: [''],
    dept_name :[''],
    server_id:[''],
    server_ip:[''],
    mobile_no:[''],
    address :['']
  })
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  

  displayedColumns: string[] = ['sn', 'name', 'dept_name', 'mobile_no', 'email_id', 'machine_ip','apps_working','address'];

  constructor(private fB : FormBuilder,private cms : CommonService,private datePipe : DatePipe) { }
  public department: any = [];
  dataSource: any = [];
  db_data:any=[];
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
  
      this.cms.getFunction('user_report').subscribe((res: any) => {
        console.log(res)
    
        if (res.length) {
          this.db_data = res;
          this.dataSource = new MatTableDataSource(this.db_data);
          this.dataSource.paginator = this.paginator;
        }
      });
   }
  
   else {
  
    this.cms.getFunction('emp_report'+"/"+this.empReportForm.value.dept_code).subscribe((res: any) => {
      console.log(res)
  
      if (res.length) {
        this.db_data = res;
        this.dataSource = new MatTableDataSource(this.db_data);
        this.dataSource.paginator = this.paginator;
      }
    });
   }
  
   }

   getDb(event:any) {

    this.cms.getFunction('db_report2'+"/"+this.empReportForm.value.server_id).subscribe((res: any) => {
      console.log(res)
  
      if (res.length) {
        this.db_data = res;
        this.dataSource = new MatTableDataSource(this.db_data);
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


    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }


  ngOnInit(): void {
   this.getDepartment();
   
  } 

}
