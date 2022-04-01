import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  serverForm : FormGroup =  this.fB.group({
    server_id:[''],
    dept_code:[''],
    server_ip: [''],
    os : [''],
    version : [''],
    machine_type : [''],
    ram : [''],
    disk_space : [''],
    physical_core : [''],
    model : [''],
    va : [''],
    va_score : [''],
    action : ['']

  })

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  displayedColumns: string[] = ['sn', 'server_ip', 'os', 'machine_type', 'ram', 'disk_space', 'physical_core' , 'model', 'va','va_score','action'];

  constructor(private fB : FormBuilder,private cms : CommonService) { }

  public department: any = [];
  dataSource: any = [];
  version_data: any = [];
  x:any='';
  flag =0;
  machine: any =[];
  model : any=[];
  os_data: any =[];
  server_data : any =[];

  y=0;

  selectedType = '' ;
  selected = '' ;

  onChange(event :any) {
    this.selected = event.source.triggerValue;
    console.log(this.selected);
    if(this.selected=="Y"){
      this.y=1;
    }
    else{
      this.flag=0;
      this.serverForm.patchValue({
        va_score :null
       } )
    }
  }

  onSubmit(){
    //console.log(this.testForm.value);
    if(this.x==0){
    this.cms.saveDetails('server',this.serverForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getServerDetails();
         this.serverForm.reset();
         Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

      }
    });
  }
  else
  {
    this.cms.updateFunction('server',this.serverForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getServerDetails();
         this.serverForm.reset();
         this.x=0;
         Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

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

 getOS() {
  this.cms.getFunction('os').subscribe((res:any) => {
    console.log(res);
    this.os_data= res;

  });
 }

 getModel() {
  this.cms.getFunction('model').subscribe((res:any) => {
    console.log(res);
    this.model= res;

  });
 }

 getVersion(event:any) {
  this.selectedType = event;
  console.log(this.selectedType);
   if(this.selectedType=='Windows') {

  this.cms.getFunction('win').subscribe((res:any) => {
    console.log(res);
    this.version_data= res;
     });
 }

 else {

 this.cms.getFunction('cent').subscribe((res:any) => {
  console.log(res);
  this.version_data= res;
  });
 }

 }

 getMachine() {
  this.cms.getFunction('machine').subscribe((res:any) => {
    console.log(res);
    this.machine= res;

  });
 }


getServer() {
  this.cms.getFunction('server').subscribe((res:any) => {
    this.server_data= res;

  });
}


getServerDetails() {
  this.cms.getFunction('server').subscribe((res: any) => {
    console.log(res)

    if (res.length) {
      this.server_data = res;
      this.dataSource = new MatTableDataSource(this.server_data);
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
    this.getServerDetails();
    this.getOS();
    this.getMachine();
    this.getModel();
    this.getDepartment();

    console.log(this.serverForm.value,"Kuchh v");

    //this.getServer();
  }

  public temp: any = []
  onEdit(server_id:any) {
    // window.scroll({ top: 0, left: 0});
  //  this.scroll.nativeElement.scrollTop=this.scroll.nativeElement.scrollHeight;
  //this.flag=1;
   this.scroll.nativeElement.scrollIntoView();
    // let body={
    //   dept_id: dept_id,
    //   user_id:user_id,
    //   cpu_sno:cpu_sno
    // }
    this.x=1;

    //console.log("Which ID is this :" ,this.dataSource.affectedRows);
    //console.log("Stock Update insert ID is :" ,this.stockForm.value.insertId);
    this.cms.getFunction('server').subscribe((res: any)=>{
      //console.log("result of response is res",res);
      //console.log("res length",res.length);
      for(let i=0;i<res.length;i++){
        if(res[i].server_id==server_id){
          console.log("res i is ",res[i]);
          this.temp=res[i];
        }
      }
      console.log("result of id dept data is",this.temp);
      this.serverForm.patchValue({
      server_ip: this.temp.server_ip,
      dept_code: this.temp.dept_code,
      server_id : this.temp.server_id,
      os:this.temp.os,
      machine_type : this.temp.machine_type,
      ram : this.temp.ram,
      physical_core : this.temp.physical_core,
      model : this.temp.model,
     // work_order_no : this.temp.work_order_no,
      //work_order_validity : this.temp.work_order_validity,
      disk_space : this.temp.disk_space,
      version : this.temp.version,
      va : this.temp.va,
      va_score : this.temp.va_score

      })
       this.getVersion(this.serverForm.value.os);

      if(this.serverForm.value.va=="Y"){
        this.flag=1;
        console.log("yes selected inside edit");
        }
     else{
         this.flag=0;
         console.log("no selected inside edit");
        }

        //this.onChange(this.serverForm.value.va);

      // console.log("Which ID is this :" ,user_id);
      // console.log("Stock Update insert ID is :" ,this.userForm.value.insertId);
      // console.log("Indide stock update form", this.userForm.value);
    });



  }

}
