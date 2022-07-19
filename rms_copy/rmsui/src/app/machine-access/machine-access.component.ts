import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-machine-access',
  templateUrl: './machine-access.component.html',
  styleUrls: ['./machine-access.component.scss']
})
export class MachineAccessComponent implements OnInit {
  machineForm : FormGroup = this.fb.group({
    user_id:[''],
    user_name:[''],
    server_ip:['']
    
  })
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['sn','user_id', 'user_name', 'server_ip'];
  constructor(private fb:FormBuilder, private cms : CommonService) { }
  public user_data:any=[];
  public data:any=[];
  public server_data:any=[];
  public machine_access_list:any=[];
  public dataSource:any=[];
  
  ngOnInit(): void {
    this.getUser();
    this.getServerList();
    this.getMachineAccessList();
    this.refresh();
  }
  getServerList(){
    this.cms.getFunction('mac_acc').subscribe((res:any)=>{
      this.server_data=res;
      console.log("server data is :",this.server_data);
    })
    
  }
  getMachineAccessList(){
    this.cms.getFunction('machine_access').subscribe((res:any)=>{
      this.machine_access_list=res;
      console.log("Machine Access list is :",this.machine_access_list);

    })
    
  }
  getUser() {
    this.cms.getFunction('user_info').subscribe((res:any) => {
      this.user_data= res;
      console.log("user data is :",this.user_data);

    });
  }

  onSubmit(){
    console.log("entered inside submit")
    console.log("user data are",this.user_data);
    console.log("server data is :",this.server_data );
    this.cms.saveDetails("mac_acc",this.machineForm.value).subscribe((res:any)=>{
      console.log("machine access details are:",res);
      if (res['affectedRows']) {
        this.machineForm.reset();
        this.refresh();
        Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

     }
    })
    console.log("form details are :",this.machineForm.value)
    
    this.refresh();
  }
  refresh():void{
    this.cms.getFunction('machine_access').subscribe((res:any)=>{
      console.log("now show the returned item from db",res);
       if(res.length){
         this.data=res;
         this.dataSource=new MatTableDataSource(this.data);
         this.dataSource.paginator=this.paginator;
       }
    })
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  public user_id:any=[];
  public user_name:any=[];

  user_details(user_id:any){
    for(let i=0;i<this.user_data.length;i++){
      if(user_id==this.user_data[i].user_id){
        //this.was_issued_to= this.user_data[i].name;
        this.user_name = this.user_data[i].name;
        
        console.log("user name is number",this.user_name);
      }

    }
  
  }

  selectedUserID(id :any){

    console.log("user id is ",id);
    this.user_id=id;
    this.user_details(this.user_id);
  }

}
