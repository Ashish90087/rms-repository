import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-return-stock',
  templateUrl: './return-stock.component.html',
  styleUrls: ['./return-stock.component.scss']
})
export class ReturnStockComponent implements OnInit {
  returnForm : FormGroup;
  public stocks: any =[];
  public users:any=[];
  public department:any=[];
  public brands:any=[];
  public hardware:any=[];
  public status:any=[];
  dataSource:any=[];
  displayedColumns:string[] =['stock_id','was_issued_to','returned_date','serial_no','dept_id','status_id','g_form_no','woPDF','remarks' ];
  user_data: any=[];
  public id1 : any=0;
  public hardwares:any=[];
  public wo: any;
  public folder_location:any;

  public temp_file :any;
  @ViewChild(MatPaginator) paginator : MatPaginator| undefined;
  constructor(private fb:FormBuilder ,private cms: CommonService,private datePipe: DatePipe, private http: HttpClient) {

    this.returnForm = this.fb.group({
      stock_id:[],
      was_issued_to:[],
      returned_date:[],
      serial_no:[],
      dept_id:[],
      status_id:[3],
      g_form_no:[],
      glocation:[],
      remarks:[]

    })

  }

  ngOnInit(): void {
    //this.getDepartment();
    //this.getBrand();

    //this.getHardware();
    this.getStatus();
    this.refresh();
    this.getIssuedUsersStocks();
    this.getReturnedStocks();
  }
  onSubmit(){
    this.returnForm.patchValue({
      returned_date: this.datePipe.transform(this.returnForm.get("returned_date")?.value, "yyyy-MM-dd"),
      //issued_date: this.datePipe.transform(this.returnForm.get("issued_date")?.value, "yyyy-MM-dd")
    });
    console.log("I am inside submit and id is: ",this.id1);
    //console.log("Hi I am inside on submit for edit functionality", this.id1);


        console.log("I entered inside for update");
        this.cms.returnStocks(this.returnForm.value).subscribe((res:any)=>{
                if(res['affectedRows']){
                  this.refresh();
                  this.returnForm.reset();
                  Swal.fire({icon:'success',text:'saved successfully',timer:2000});
                }
              })


   }
   //refresh():void{
    // this.cms.getFunction4('cms/getFunction4').subscribe((res:any)=>{
    //    if(res.length){
    //      this.user_data=res;
    //      this.dataSource=new MatTableDataSource(this.user_data);
    //      this.dataSource.paginator=this.paginator;
    //    }
    // })
  //   this.cms.getFunction4('cms/getFunction4').subscribe((res:any)=>{
  //     if(res.length){
  //       this.user_data=res;
  //       this.dataSource=new MatTableDataSource(this.user_data);
  //       this.dataSource.paginator=this.paginator;
  //     }
  //  })
  // }
  // getDepartment(){
  //   this.cms.getFunction1('cms/getFunction1').subscribe((res:any)=>{
  //     this.department=res;
  //     console.log(this.department);
  //   })
  // }
  // getHardware(){
  //   this.cms.getHardwares('cms/getHardwares').subscribe((res:any)=>{
  //     this.hardwares=res;
  //     console.log(this.hardwares);
  //   })
  // }
  // getBrand(){
  //   this.cms.getFunction3('cms/getFunction3').subscribe((res:any)=>{
  //     this.brands=res;
  //     console.log(this.brands);
  //   })
  // }
  // getUsers(){
  //   this.cms.getFunction2('cms/getFunction2').subscribe((res:any)=>{
  //     this.users=res;
  //     console.log(this.users);
  //   })

 // }
  getStatus(){
    this.cms.getFunction7('cms/getFunction7').subscribe((res:any)=>{
      this.status=res;
      console.log(this.status);
    })
  }
  getIssuedUsersStocks(){
    this.cms.getIssueStocks1('cms/getIssueStocks1').subscribe((res:any)=>{
      this.user_data=res;
      console.log("Issued users and stocks", this.user_data);
      console.log("username is:" ,this.user_data[0].name);
    })
  }
  public returned_data:any=[];
  getReturnedStocks(){
    this.cms.returnedStocks('cms/returnedStocks',this.returnForm.value).subscribe((res:any)=>{
      this.returned_data=res;
      console.log("Returned users and stocks",this.returned_data);

    })
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.returned_data.filter = filterValue.trim().toLowerCase();

    if (this.returned_data.paginator) {
      this.returned_data.paginator.firstPage();
    }
  }
  refresh():void{
    this.cms.returnedStocks('cms/returnedStocks',this.returnForm.value).subscribe((res:any)=>{
      console.log("now show the returned item from db",res);
       if(res.length){
         this.user_data=res;
         this.returned_data=new MatTableDataSource(this.user_data);
         this.returned_data.paginator=this.paginator;
       }
    })
  }
  
  selectWorkOrder(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.wo = file;
      this.folder_location = './uploads/' + 'gform' + '/';

    }
    const formData = new FormData();
    formData.append('file', this.wo);
    formData.append('folder_name', this.folder_location);

    this.http.post<any>('http://localhost:3000/upload/file', formData).subscribe(res => {
      console.log(res);
      this.temp_file = res;
      console.log(this.temp_file.path);

      this.returnForm.patchValue({
       glocation: this.temp_file.filepath,
      }

    );
    console.log(this.returnForm.value.glocation)

    });


  }
  woPDF(glocation:any){
    console.log("I am WO PDF");
    console.log(glocation)
  const url= ('http://localhost:3000/' +glocation );
  window.open(url);
  //console.log(url);

  }

  public deptdata: any = [];
   onEdit(stock_id: any) {
     this.id1=stock_id;
    console.log("Which ID is this :",stock_id);
    console.log("Inside stock update form", );
    this.cms.updateStock(stock_id).subscribe((res: any)=>{
      console.log("result of response is res",res);
      for(let i=0;i<res.length;i++){
        if(res[i].stock_id==stock_id){
          console.log("res i is ",res[i]);
          this.deptdata=res[i];
        }
      }
      console.log("result of stock_id dept data is",this.deptdata);
      this.returnForm.patchValue({

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
      console.log("Stock Update insert ID is :" ,this.returnForm.value.insertId);
      console.log("Indide stock update form", this.returnForm.value);
    });

  }
  public stock_id:any;
  selectedStock(id :any){

    console.log("event is ",id);
    this.stock_id=id;
    console.log("event is ");
    this.stock_details(this.stock_id);
  }
  public dept:any;
  public was_issued_to:any;
  public serial_no:any;
  stock_details(stock_id:any){
    for(let i=0;i<this.user_data.length;i++){
      if(stock_id==this.user_data[i].stock_id){
        this.was_issued_to= this.user_data[i].name;
        this.serial_no = this.user_data[i].monitor_sno;
        this.dept=this.user_data[i].dept_name;
        console.log("serial number",this.serial_no);
        console.log("was issued to",this.was_issued_to);
        console.log("was issued to",this.dept);
      }

    }
    // this.was_issued_to= this.user_data[1].name;
    // this.serial_no = this.user_data[1].monitor_sno;

    // if(stock_id==this.user_data[1].stock_id){
    //   console.log("serial number",this.serial_no);
    //   console.log("was issued to",this.was_issued_to);
    //   //console.log("serial number");
    // }
  }

}
