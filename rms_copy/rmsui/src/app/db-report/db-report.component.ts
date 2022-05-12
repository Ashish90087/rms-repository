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
  selector: 'app-db-report',
  templateUrl: './db-report.component.html',
  styleUrls: ['./db-report.component.scss']
})
export class DbReportComponent implements OnInit {

  dbReportForm : FormGroup =  this.fB.group({
    db_id: [''],
    dept_code: ['Y'],
    dept_name :[''],
    server_id:[''],
    server_ip:[''],
    db_name:[''],
  })
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  

  displayedColumns: string[] = ['sn', 'db_name', 'db_type', 'app_name', 'dept_name', 'db_server' ];

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
  
      this.cms.getFunction('db').subscribe((res: any) => {
        console.log(res)
    
        if (res.length) {
          this.db_data = res;
          this.dataSource = new MatTableDataSource(this.db_data);
          this.dataSource.paginator = this.paginator;
        }
      });
   }
  
   else {
  
    this.cms.getFunction('db_report'+"/"+this.dbReportForm.value.dept_code).subscribe((res: any) => {
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

    this.cms.getFunction('db_report2'+"/"+this.dbReportForm.value.server_id).subscribe((res: any) => {
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

  getDatabase(){
    this.cms.getFunction('db').subscribe((res: any) => {
      console.log(res)
  
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


  ngOnInit(): void {
   this.getDepartment();
   this.getDatabase();
   
  } 

}
