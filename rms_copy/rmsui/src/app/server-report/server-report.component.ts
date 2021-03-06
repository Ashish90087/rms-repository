import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
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
  selector: 'app-server-report',
  templateUrl: './server-report.component.html',
  styleUrls: ['./server-report.component.scss']
})
export class ServerReportComponent implements OnInit {

  serverReportForm : FormGroup =  this.fB.group({
    db_id: [''],
    db_name:[''],
    dept_code: ['Y'],
    dept_name :[''],
    server_id:[''],
    server_ip:[''],
    app_id:[''],
    app_name:[''],
    server_type:['']
  })
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  

  displayedColumns: string[] = ['sn', 'server_ip', 'server_type', 'dept_name', 'app_name', 'db_name' ];

  constructor(private fB : FormBuilder,private cms : CommonService,private datePipe : DatePipe) { }
  public department: any = [];
  dataSource: any = [];
  db_data:any=[];
  platform:any=[];
  project_details:any=[];
  x:any=[];

  selected = '' ;
  selectedType = '';
  selectedElement='';
  selected2Element='';

  // onChange(event :any) {
  //   this.selected = event.source.triggerValue;
  //   console.log(this.selected);
    
  // }

  getDept(event:any) {

    this.dataSource = '';
    this.selected = event.value;
    console.log(event.value);
    if(this.selected=="Y") {
  
      this.cms.getFunction('server_report1').subscribe((res: any) => {
        console.log(res)
    
        if (res.length) {
          this.db_data = res;
          this.dataSource = new MatTableDataSource(this.db_data);
          this.dataSource.paginator = this.paginator;
        }
      });
   }
  
   else {
  
    this.cms.getFunction('server_report'+"/"+this.serverReportForm.value.dept_code).subscribe((res: any) => {
      console.log(res)
  
      if (res.length) {
        this.db_data = res;
        this.dataSource = new MatTableDataSource(this.db_data);
        this.dataSource.paginator = this.paginator;
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

  getServer(){
    this.cms.getFunction('server_report1').subscribe((res: any) => {
      console.log(res)
  
      if (res.length) {
        this.db_data = res;
        this.dataSource = new MatTableDataSource(this.db_data);
        this.dataSource.paginator = this.paginator;
      }
    });

  }

  clearserver(){
    
    this.selected2Element = '';
       
  
  }

  cleardept(){
    this.selectedElement = '';
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
   this.getServer();
   
  } 

}