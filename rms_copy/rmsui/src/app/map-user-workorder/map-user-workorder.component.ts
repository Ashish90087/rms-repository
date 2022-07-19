import { Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-map-user-workorder',
  templateUrl: './map-user-workorder.component.html',
  styleUrls: ['./map-user-workorder.component.scss']
})
export class MapUserWorkorderComponent implements OnInit {

  mapForm : FormGroup =  this.fB.group({
    user_id : [''],
    work_order_no :[''],
    design_id :[''],
    work_order_from : [''],
    wo_details_id : [''],

  })

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['sn', 'workorder', 'name'];

  constructor(private fB : FormBuilder,private cms : CommonService) { }

  public wo_data: any = [];
  public workorder : any =[];
  public user_data: any = [];
  public map_data : any =[];
  designation : any=[];
  dataSource: any = [];
  public data:any;
  public user:any=[];


  onSubmit(){

    let d:any=[];
    this.data=this.mapForm.value;
    console.log(this.data);
   for(let i=0;i<this.data.user_id.length;i++){

    //console.log({"app_id":this.data.app_id,"user_id":this.data.user_id[i]},"new data " +i,this.user);
      // break;

          this.cms.saveDetails('mapwo',{"wo_details_id":this.data.wo_details_id,"user_id":this.data.user_id[i]}).subscribe((res:any) => {
            console.log(res);
            if (res['affectedRows']) {
               this.getMapDetails();
               this.mapForm.reset();
               Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

            }
          });
  }


  }

  getMapDetails() {
        this.cms.getFunction('mapwo').subscribe((res: any) => {
          console.log(res);

        if (res.length) {
          this.map_data = res;
          this.dataSource = new MatTableDataSource(this.map_data);
          this.dataSource.paginator = this.paginator;
        }
      });
    }

    getWODetails() {
      this.cms.getFunction('wodetails').subscribe((res:any) => {
        this.wo_data= res;
       console.log(this.wo_data);

      });
    }

    getWorkOrder() {
      this.cms.getFunction('workorder').subscribe((res:any) => {
        this.workorder= res;
       // console.log(this.department);

      });
    }

    getDesignType() {
      this.cms.getFunction('design').subscribe((res:any) => {
        this.designation= res;
        console.log(this.designation);

      });
    }

    getUser() {
        this.cms.getFunction('user_info').subscribe((res:any) => {
          this.user_data= res;

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
    this.getDesignType();
    this.getWODetails();
    this.getWorkOrder();
    this.getUser();
    this.getMapDetails();
  }

}
