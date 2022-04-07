import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-issue-form',
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss']
})
export class IssueFormComponent implements OnInit {
  issueForm : FormGroup;
  public users:any=[];
  public status:any=[];
  public stocks:any=[];
  wo: any;
  folder_location:any;

  temp_file :any;
  dataSource:any=[];
  displayedColumns:string[] =['issued_to','stock_id','issued_date','marked_no','remark','status_id' ];
  user_data: any=[];
  public hardwares:any=[];
  @ViewChild(MatPaginator) paginator : MatPaginator| undefined;
  constructor(private fb:FormBuilder,private http: HttpClient ,private commonservice: CommonService,private datePipe: DatePipe) {

    this.issueForm = this.fb.group({
      issued_to:[],
      stock_id:[],
      issued_date:[],
      marked_no:[],
      remark:[],
      status_id:[2],

    })

  }

  ngOnInit(): void {
    this.getUsers();
    this.getStatus();
    this.getStocks();
    this.refresh();
  }

  getUsers(){
    this.commonservice.getFunction('users/usermas').subscribe((res:any)=>{
      this.users=res;
      console.log(this.users);
    })

  }
  getStatus(){
    this.commonservice.getFunction('users/status').subscribe((res:any)=>{
      this.status=res;
      console.log(this.status);
    })
  }
  getStocks(){
    this.commonservice.getFunction('users/getStocks').subscribe((res:any)=>{
      this.stocks=res;
      console.log(this.stocks);
    })
  }
  print(){
    console.log("Hi");
  }
  selectWorkOrder(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.wo = file;
      this.folder_location = './uploads/' + 'iform' + '/';

    }
    const formData = new FormData();
    formData.append('file', this.wo);
    formData.append('folder_name', this.folder_location);

    this.http.post<any>('http://localhost:3000/upload/file', formData).subscribe(res => {
      console.log(res);
      this.temp_file = res;
      console.log(this.temp_file.path);

      this.issueForm.patchValue({
       ilocation: this.temp_file.filepath,
      }

    );
    console.log(this.issueForm.value.ilocation)

    });


  }
  woPDF(ilocation:any){
    console.log("I am WO PDF");
    console.log(ilocation)
  const url= ('http://localhost:3000/' + ilocation );
  window.open(url);
  //console.log(url);

  }
public stat:any=[];
  onSubmit(){
    this.issueForm.patchValue({
      date: this.datePipe.transform(this.issueForm.get("date")?.value, "yyyy-MM-dd"),
      issued_date: this.datePipe.transform(this.issueForm.get("issued_date")?.value, "yyyy-MM-dd")
    });
      console.log("inside submit",this.issueForm.value);
      this.stat=this.issueForm.value;
      console.log("status field is ",this.stat.status_id);

      this.commonservice.saveDetails('users/issuedstocks',this.issueForm.value).subscribe((res:any)=>
        {
              if(res['affectedRows'])
              {   console.log("inside save1",this.issueForm.value);
                  this.refresh();
                  this.issueForm.reset();
                  Swal.fire({icon:'success',text:'saved successfully',timer:2000});
                }
        });
        this.commonservice.updateStatusInStockReceive('users/updateStatus',this.stat).subscribe((res:any)=>
        {
              if(res['affectedRows'])
              {   console.log("inside update1",this.stat.status_id);
                  this.refresh();
                  this.issueForm.reset();
                  Swal.fire({icon:'success',text:'saved successfully',timer:2000});
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

   refresh():void{
    this.commonservice.getFunction('users/issuestocks').subscribe((res:any)=>{
       if(res.length){
         this.user_data=res;
         this.dataSource=new MatTableDataSource(this.user_data);
         this.dataSource.paginator=this.paginator;
       }
    })
  }
}

