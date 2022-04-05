import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-receive-form',
  templateUrl: './receive-form.component.html',
  styleUrls: ['./receive-form.component.scss']
})
export class ReceiveFormComponent implements OnInit {

  receiveForm : FormGroup;
  public department: any =[];
  public brands:any=[];
  public users:any=[];
  public stockData:any=[];
  public status:any=[];
  dataSource:any=[];
  displayedColumns:string[] =['dept_id','hardware_id','received_date','cpu_sno','monitor_sno','keyboard_sno','mouse_sno','make_model_id','iform','status_id' ];
  user_data: any=[];
  public id1 : any=0;
  public hardwares:any=[];
  @ViewChild(MatPaginator) paginator : MatPaginator| undefined;

  constructor(private fb:FormBuilder ,private commonservice: CommonService,private datePipe: DatePipe) {

    this.receiveForm = this.fb.group({
      stock_id:[],
      dept_id:[],
      hardware_id:[],
      received_date:[],
      cpu_sno:[],
      monitor_sno:[],
      keyboard_sno:[],
      mouse_sno:[],
      make_model_id:[],
      status_id:[1],
      iform_id : []

    })

   }

  getHardware(){
    this.commonservice.getFunction('users/hardwares').subscribe((res:any)=>{
      this.hardwares=res;
      console.log(this.hardwares);
    })
  }
  getBrand(){
    this.commonservice.getFunction('users/brand').subscribe((res:any)=>{
      this.brands=res;
      console.log(this.brands);
    })
  }

  getDepartment(){
    this.commonservice.getFunction('users').subscribe((res:any)=>{
      this.department=res;
      console.log(this.department);
    })
  }
  getStatus(){
    this.commonservice.getFunction('users/status').subscribe((res:any)=>{
      this.status=res;
      console.log(this.status);
    })
  }

  ngOnInit(): void {
    this.getDepartment();
    this.getBrand();

    this.getHardware();
    this.getStatus();
    this.refresh();
  }

  onSubmit(){
    this.receiveForm.patchValue({
      received_date: this.datePipe.transform(this.receiveForm.get("received_date")?.value, "yyyy-MM-dd")
    });
    console.log("I am inside submit and id is: ",this.id1);
      if(this.id1==0)
      {
        console.log("I entered inside for update",this.id1);
        this.commonservice.saveDetails('users/receiving_stocks',this.receiveForm.value).subscribe((res:any)=>{
                if(res['affectedRows']){
                  this.refresh();
                  this.receiveForm.reset();
                  Swal.fire({icon:'success',text:'saved successfully',timer:2000});
                }
              })
      }
    else {
      this.commonservice.updateFunction('users/stocks',this.receiveForm.value).subscribe((res:any)=>{
      console.log("I entered inside save");
      if(res['affectedRows']){
        this.refresh();
        this.receiveForm.reset();
        Swal.fire({icon:'success',text:'saved successfully',timer:2000});
      }
    });
    }

   }

   refresh():void{
    this.commonservice.getFunction('users/receiving_stocks').subscribe((res:any)=>{
      console.log("now show the returned item from db",res);
       if(res.length){
         this.user_data=res;
         this.dataSource=new MatTableDataSource(this.user_data);
         this.dataSource.paginator=this.paginator;
       }
    })
  }
  public deptdata: any = [];
   onEdit(stock_id: any,event:any) {
     this.id1=stock_id;
    console.log("Which ID is this :",stock_id);
    console.log("Inside stock update form", );
    this.commonservice.updateStock(stock_id).subscribe((res: any)=>{
      console.log("result of response is res",res);
      for(let i=0;i<res.length;i++){
        if(res[i].stock_id==stock_id){
          console.log("res i is ",res[i]);
          this.deptdata=res[i];
        }
      }
      console.log("result of stock_id dept data is",this.deptdata);
      this.receiveForm.patchValue({

      stock_id:this.deptdata.stock_id,
      dept: this.deptdata.dept,
      received_date:this.deptdata.received_date,
      cpu_sno:this.deptdata.cpu_sno,
      monitor_sno:this.deptdata.monitor_sno,
      keyboard_sno:this.deptdata.keyboard_sno,
      mouse_sno:this.deptdata.mouse_sno,
      brand_id:this.deptdata.brand_id
      })
      console.log("Which ID is this :" ,stock_id);
      console.log("Stock Update insert ID is :" ,this.receiveForm.value.insertId);
      console.log("Indide stock update form", this.receiveForm.value);
    });

  }
  scrollToTop(){
    document.body.scrollTop=document.documentElement.scrollTop=0;
  }
}
