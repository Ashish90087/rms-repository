import { Component, OnInit, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-map-app-user',
  templateUrl: './map-app-user.component.html',
  styleUrls: ['./map-app-user.component.scss']
})
export class MapAppUserComponent implements OnInit {

  mappingForm : FormGroup =  this.fB.group({
    app_id : [''],
    Employees : [''],
   //app_name : [''],
    user_id : [''],
    //name : ['']

  })

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['sn', 'app_name', 'name'];
  filteredApps: Observable<any> | undefined;
 

  constructor(private fB : FormBuilder,private cms : CommonService) { }

  app_data: any = [];
  public user_data: any = [];
  public map_data : any =[];
  dataSource: any = [];
  public data:any;
  public user:any=[];
  //selected = this.app_data; 



  onSubmit(){

    let d:any=[];
    this.data=this.mappingForm.value;
   for(let i=0;i<this.data.user_id.length;i++){

    //console.log({"app_id":this.data.app_id,"user_id":this.data.user_id[i]},"new data " +i,this.user);
      // break;

          this.cms.saveDetails('map',{"app_id":this.data.app_id,"user_id":this.data.user_id[i]}).subscribe((res:any) => {
            console.log(res);
            if (res['affectedRows']) {
               this.getMapDetails();
               this.mappingForm.reset();
               Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });

            }
          });
  }


  }

  getMapDetails() {
        this.cms.getFunction('map').subscribe((res: any) => {
          console.log(res);

        if (res.length) {
          this.map_data = res;
          this.dataSource = new MatTableDataSource(this.map_data);
          this.dataSource.paginator = this.paginator;
        }
      });
    }

    getApplication() {
      
      this.cms.getFunction('app_info').subscribe((res:any) => {
        this.app_data= res;
        console.log(this.app_data);

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
    this.getApplication();
    this.getUser();
    this.getMapDetails();
    
  }

}
