import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../services/common.service';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
 testForm : FormGroup
  constructor(private fb: FormBuilder,private commonservice:CommonService) {this.testForm = this.fb.group({
    name: ['Rohit'],
    dept_code:[]

    
  });

    
   }
   public department: any = [];
  ngOnInit(): void {
    this.getDepartment();

}
onSubmit(){
  //console.log(this.testForm.value);
  this.commonservice.save('users',this.testForm.value).subscribe((res:any) => {
    console.log(res);
    alert(res.insertId);
  });
}
onclick(){
  alert('Data reset')
}

getDepartment() {
  this.commonservice.getFunction("common/getFunction").subscribe((res:any) => {
    this.department= res;
    console.log(this.department);

  });
}
}