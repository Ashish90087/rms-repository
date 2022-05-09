import { Component } from '@angular/core';
import { ExcelService } from './services/excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rmsui';

  // sideBarOpen = true;

  // sideBarToggler() {
  //   this.sideBarOpen = !this.sideBarOpen;
  // }
}
