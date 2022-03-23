import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
  profileForm : FormGroup =  this.fB.group({
    firstName :[''],
    lastName : [''],
    address : [''],
    dob : [''],
    gender : ['']
  }) 
  constructor(private fB : FormBuilder) { }
  
  saveForm(){
    console.log('Form data is ', this.profileForm.value);
  }

  ngOnInit(): void {
  }

}
