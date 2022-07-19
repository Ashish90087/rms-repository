import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss']
})
export class HardwareComponent implements OnInit {

  hardwareForm : FormGroup =  this.fB.group({
    h_id: [''],
    remarks : [''],
    h_name :['']
  })
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild('scroll', {read : ElementRef}) public scroll!: ElementRef<any>;
  displayedColumns: string[] = ['sn', 'hardware_name', 'remarks','action'];
  constructor(private fB : FormBuilder,private cms : CommonService) { }
  public hardware: any = [];
  dataSource: any = [];
  x:any=[];

  onSubmit(){
    //console.log(this.testForm.value);
    if(this.x==0){
    this.cms.saveDetails('hardware',this.hardwareForm.value).subscribe((res:any) => {
      console.log("hardwre data is :", res);
      if (res['affectedRows']) {
         this.getHardwareDetails();
         this.hardwareForm.reset();
         Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

      }
    });
  }
  else
  {
    this.cms.updateFunction('hardware',this.hardwareForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getHardwareDetails();
         this.hardwareForm.reset();
         this.x=0;
         Swal.fire({ icon: 'success', text: "Updated Successfully.", timer: 2000 });

      }
    });

  }

  }

  getHardwareDetails() {
        this.cms.getFunction('hardware').subscribe((res: any) => {

        if (res.length) {
          this.hardware = res;
          this.dataSource = new MatTableDataSource(this.hardware);
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
    this.getHardwareDetails();
  }

  public temp: any = []
  onEdit(h_id:any) {
    // window.scroll({ top: 0, left: 0});
  //  this.scroll.nativeElement.scrollTop=this.scroll.nativeElement.scrollHeight;
   this.scroll.nativeElement.scrollIntoView();
    // let body={
    //   dept_id: dept_id,
    //   user_id:user_id,
    //   cpu_sno:cpu_sno
    // }
    this.x=1;

    //console.log("Which ID is this :" ,this.dataSource.affectedRows);
    //console.log("Stock Update insert ID is :" ,this.stockForm.value.insertId);
    this.cms.getFunction('hardware').subscribe((res: any)=>{
      //console.log("result of response is res",res);
      //console.log("res length",res.length);
      for(let i=0;i<res.length;i++){
        if(res[i].h_id==h_id){
          console.log("res i is ",res[i]);
          this.temp=res[i];
        }
      }
      console.log("result of id dept data is",this.temp);
      this.hardwareForm.patchValue({
      h_id: this.temp.h_id,
      h_name : this.temp.h_name,
      remarks:this.temp.remarks

      })
    });
  }

}
