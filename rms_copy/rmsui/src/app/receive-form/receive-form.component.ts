import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-receive-form',
  templateUrl: './receive-form.component.html',
  styleUrls: ['./receive-form.component.scss']
})
export class ReceiveFormComponent implements OnInit {
  wo: any;
  folder_location:any;

  temp_file :any;
  localUrl: any[] | undefined;
  receiveForm : FormGroup;
  public department: any =[];
  public brands:any=[];
  public users:any=[];
  public stockData:any=[];
  public status:any=[];
  dataSource:any=[];
  displayedColumns:string[] =['dept_id','hardware_id','received_date','cpu_sno','monitor_sno','keyboard_sno','mouse_sno','make_model_id','i_form_no','woPDF','status_id','remarks','action' ];
  user_data: any=[];
  public id1 : any=0;
  public hardwares:any=[];
  @ViewChild(MatPaginator) paginator : MatPaginator| undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  file: any;
  file_name: any = 'NA';

  constructor(private fb:FormBuilder ,private commonservice: CommonService,private http: HttpClient ,private datePipe: DatePipe) {

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
      remarks:[],
      status_id:[1],
      i_form_no:[],
      ilocation:[],
      

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
    //console.log("I am inside submit and id is: ",this.id1);
      if(this.id1==0)
      {
        console.log("I entered inside for update",this.id1);
        console.log(this.receiveForm.value);
        this.commonservice.saveDetails('users/receiveNewStock',this.receiveForm.value).subscribe((res:any)=>{
                if(res['affectedRows']){
                  this.refresh();
                  this.receiveForm.reset();
                  this.file = '';
                  this.localUrl = undefined;
                  this.file_name = 'NA';
                  Swal.fire({icon:'success',text:'Saved Successfully',timer:2000});
                }
              })
      }
    else {
      this.commonservice.updateFunction('users/receiving_stocks',this.receiveForm.value).subscribe((res:any)=>{
      console.log("I entered inside save");
      if(res['affectedRows']){
        this.refresh();
        this.receiveForm.reset();
        Swal.fire({icon:'success',text:'Saved Successfully',timer:2000});
      }
    });
    }

   }
   public h_id:any;
   selectedHardware(hw:any){
     this.h_id=hw;
     console.log("brand id is :",this.h_id );
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
  selectWorkOrder(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.wo = file;
      this.folder_location = './uploads/' + 'iform' + '/';
      this.file = event.target.files[0].name;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    

    }
    const formData = new FormData();
    formData.append('file', this.wo);
    formData.append('folder_name', this.folder_location);
    formData.append('prev_file_name', this.file_name);
    //  'http://localhost:3000/upload/file'
    //'environment.rooturl+upload+/file'
    this.http.post<any>(environment.rootUrl+'upload'+'/file', formData).subscribe(res => {
      console.log(res);
      this.temp_file = res;
      this.file_name = res.file_name;
      console.log(this.temp_file.path);

      this.receiveForm.patchValue({
       ilocation: this.temp_file.filepath,
      }

    );
    console.log(this.receiveForm.value.ilocation)

    });


  }
  zoompdf=0;
  zomminc(){
    this.zoompdf+=1;
  }
  zommdec(){
    if(this.zoompdf>1){
      this.zoompdf-=1;
    }
  }
  woPDF(ilocation:any){
    console.log("I am WO PDF");
    console.log(ilocation)
  //const url= ('http://localhost:3000/' + ilocation );
  const url= (environment.rootUrl + ilocation );
  window.open(url);
  //console.log(url);

  }
  public deptdata: any = [];
   onEdit(stock_id: any) {
    this.scroll.nativeElement.scrollIntoView();
     this.id1=stock_id;
    // console.log("Which ID is this :",stock_id);
    // console.log("Inside stock update form", );
    this.commonservice.updateStock('users/patch_stock').subscribe((res: any)=>{
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
      dept_id: this.deptdata.dept_id,
      hardware_id:this.deptdata.hardware_id,
      received_date:this.deptdata.r_date,
      cpu_sno:this.deptdata.cpu_sno,
      monitor_sno:this.deptdata.monitor_sno,
      keyboard_sno:this.deptdata.keyboard_sno,
      mouse_sno:this.deptdata.mouse_sno,
      brand_id:this.deptdata.brand_id,
      make_model_id:this.deptdata.make_model_id,
      remarks:this.deptdata.remarks,
      status_id:this.deptdata.status_id,
      i_form_no:this.deptdata.i_form_no,
      ilocation:this.deptdata.ilocation

      })
      console.log("Which ID is this :" ,stock_id);
      console.log("Stock Update insert ID is :" ,this.receiveForm.value.insertId);
      console.log("Indide stock update form", this.receiveForm.value);
    });

  }
  scrollToTop(){
    document.body.scrollTop=document.documentElement.scrollTop=0;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
