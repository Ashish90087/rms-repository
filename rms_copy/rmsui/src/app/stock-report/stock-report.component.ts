import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.scss']
})
export class StockReportComponent implements OnInit {


  stockReportForm : FormGroup =  this.fB.group({
    stock_id:['Y'],
    dept_id:[],
    hardware_id:[],
    monitor_sno:[],
    status_id:[1],
    name:[]
    
  })
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  

  displayedColumns: string[] = ['sn', 'stock_id', 'dept_id', 'hardware_id', 'monitor_sno','status_id',];
  db_data: any;

  constructor(private fB : FormBuilder,private cms : CommonService,private datePipe : DatePipe) { }
  public department: any = [];
  dataSource: any = [];
  stock_data:any=[];
  platform:any=[];
  project_details:any=[];
  x:any=[];

  selected = '' ;
  selectedType = '';

  // onChange(event :any) {
  //   this.selected = event.source.triggerValue;
  //   console.log(this.selected);
    
  // }

  // getStock(event:any) {
  //   console.log("I entered here")
  //   this.dataSource='';
  //   this.selected = event.value;
  //   console.log("Event value is",event.value);
    
  // if(this.selected=='Y'){
  //     this.cms.getFunction('stock_report').subscribe((res: any) => {
  //       console.log(res)
    
  //       if (res.length) {
  //         this.db_data = res;
  //         this.dataSource = new MatTableDataSource(this.db_data);
  //         this.dataSource.paginator = this.paginator;
  //       }
  //     });
  //   }
  //  else {
  
  //   this.cms.getFunction('stock_report'+this.stockReportForm.value).subscribe((res: any) => {
  //     console.log(res)
  
  //     if (res.length) {
  //       this.db_data = res;
  //       this.dataSource = new MatTableDataSource(this.db_data);
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   });
  //  }
  
   //}

   getStockDetails(){
        this.cms.getFunction('stock_report').subscribe((res: any) => {
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
   
  // getEmployees(){
  //   this.cms.getFunction('user_report').subscribe((res: any) => {
  //     console.log(res)
  
  //     if (res.length) {
  //       this.db_data = res;
  //       this.dataSource = new MatTableDataSource(this.db_data);
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   });
  // }


    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }


  ngOnInit(): void {
   this.getDepartment();
   this.getStockDetails();
      
  } 


}
