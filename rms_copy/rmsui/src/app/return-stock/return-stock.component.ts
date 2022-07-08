import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx'; 



@Component({
  selector: 'app-return-stock',
  templateUrl: './return-stock.component.html',
  styleUrls: ['./return-stock.component.scss']
})
export class ReturnStockComponent implements OnInit {
  returnForm : FormGroup;
  fileName= 'ExcelSheet.xlsx';
  public stocks: any =[];
  public users:any=[];
  public department:any=[];
  public brands:any=[];
  public hardware:any=[];
  public status:any=[];
  dataSource:any=[];
  displayedColumns:string[] =['stock_id','was_issued_to','returned_date','serial_no','dept_id','status_id','g_form_no','woPDF','remarks','action' ];
  public user_data: any=[];
  public id1 : any=0;
  public hardwares:any=[];
  public wo: any;
  public folder_location:any;

  public temp_file :any;
  @ViewChild(MatPaginator) paginator : MatPaginator| undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  @ViewChild('content', { static: false }) content!: ElementRef<any>;  
 
  constructor(private fb:FormBuilder ,private cms: CommonService,private datePipe: DatePipe, private http: HttpClient, private element: ElementRef) {

    this.returnForm = this.fb.group({
      stock_id:[],
      was_issued_to:[],
      returned_date:[],
      serial_no:[],
      dept_id:[],
      status_id:[5],
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
    //this.getIssuedUsersStocks();
    this.getReturnedStocks();
    this.stocksToreturn();
  }


  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

  onSubmit(){
    this.returnForm.patchValue({
      returned_date: this.datePipe.transform(this.returnForm.get("returned_date")?.value, "yyyy-MM-dd"),
      //issued_date: this.datePipe.transform(this.returnForm.get("issued_date")?.value, "yyyy-MM-dd")
    });
    console.log("I am inside submit and id is: ",this.id1);
    //console.log("Hi I am inside on submit for edit functionality", this.id1);

    if(this.id1==0){
        console.log("I entered inside for update",this.returnForm.value);
        this.cms.returnStocks('users/ReturnAndUpdateStock',this.returnForm.value).subscribe((res:any)=>{
                if(res['affectedRows']){
                  this.refresh();
                  this.returnForm.reset();
                  Swal.fire({icon:'success',text:'Saved Successfully',timer:2000});
                }
              })
            }
            else{
              this.cms.updateFunction('users/returns',this.returnForm.value).subscribe((res:any)=>{
                console.log("I entered inside save");
                if(res['affectedRows']){
                  this.refresh();
                  this.returnForm.reset();
                  Swal.fire({icon:'success',text:'Updated Successfully',timer:2000});
                }
              });
            }

   }
  getStatus(){
    this.cms.getFunction('users/status').subscribe((res:any)=>{
      this.status=res;
      console.log(this.status);
    })
  }
  // getIssuedUsersStocks(){
  //   this.cms.getIssueStocks1('cms/getIssueStocks1').subscribe((res:any)=>{
  //     this.user_data=res;
  //     console.log("Issued users and stocks", this.user_data);
  //     console.log("username is:" ,this.user_data[0].name);
  //   })
  // }
  public toReturn:any=[];
  stocksToreturn(){
    this.cms.getStocksToReturn('users/stockstoreturn').subscribe((res:any)=>{
      this.toReturn=res;
      console.log("stocks which can be returned",this.toReturn);
    })
  }
  public returned_data:any=[];
  getReturnedStocks(){
    this.cms.returnedStocks('users/returnstocks',this.returnForm.value).subscribe((res:any)=>{
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
    this.cms.returnedStocks('users/returnstocks',this.returnForm.value).subscribe((res:any)=>{
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

    this.http.post<any>(environment.rootUrl+'upload'+'/file', formData).subscribe(res => {
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
  //const url= ('http://localhost:3000/' +glocation );
  const url= (environment.rootUrl + glocation );
  window.open(url);
  //console.log(url);

  }
  public stock_id:any;
  selectedStock(id :any){

    console.log("event is ",id);
    this.stock_id=id;
    this.stock_details(this.stock_id);
  }

  public deptdata: any = [];
   onEdit(stock_id: any) {
     this.id1=stock_id;
     this.scroll.nativeElement.scrollIntoView();
    console.log("Which ID is this :",stock_id);
    console.log("Inside stock update form", );
    this.cms.updateStock('users/patchReturnStocks').subscribe((res: any)=>{
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
      serial_no: this.deptdata.serial_no,
      dept_id:this.deptdata.dept_id,
      remarks:this.deptdata.remarks,
      status_id:this.deptdata.re,
      returned_date:this.deptdata.returned_date,
      g_form_no:this.deptdata.g_form_no
      })
      console.log("Which ID is this :" ,stock_id);
      console.log("Stock Update insert ID is :" ,this.returnForm.value.insertId);
      console.log("Indide stock update form", this.returnForm.value);
    });

  }

  public dept:any;
  public was_issued_to:any;
  public serial_no:any;
  stock_details(stock_id:any){
    for(let i=0;i<this.toReturn.length;i++){
      if(stock_id==this.toReturn[i].stock_id){
        //this.was_issued_to= this.user_data[i].name;
        this.serial_no = this.toReturn[i].monitor_sno;
        this.dept=this.toReturn[i].dept_name;
        console.log("serial number",this.serial_no);
        //console.log("was issued to",this.was_issued_to);
        console.log("was issued to",this.dept);
      }

    }
  
  }
  scrollToTop(){
    document.body.scrollTop=document.documentElement.scrollTop=0;
  }

}
