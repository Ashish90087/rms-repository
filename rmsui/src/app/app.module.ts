import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { TestComponent } from './test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsComponent } from './forms/forms.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from './user/user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DepartmentComponent } from './department/department.component'
import { ApplicationComponent } from './application/application.component';
import { DatabaseComponent } from './database/database.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule} from  '@angular/material/sidenav';
import { MatToolbarModule} from  '@angular/material/toolbar';
import { MatMenuModule} from  '@angular/material/menu';
import { MatIconModule} from  '@angular/material/icon';
import { MatDividerModule} from  '@angular/material/divider';
import { MatListModule} from  '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MapAppUserComponent } from './map-app-user/map-app-user.component';
import { ReceiveFormComponent } from './receive-form/receive-form.component';
import { ServerComponent } from './server/server.component';
import { EmployeeComponent } from './employee/employee.component';
import { MapUserWorkorderComponent } from './map-user-workorder/map-user-workorder.component';
import { DeptDialogComponent } from './dept-dialog/dept-dialog.component';


//import { AngularFileUploaderModule } from "angular-file-uploader";




@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    FormsComponent,
    UserComponent,
    DepartmentComponent,
    ApplicationComponent,
    DatabaseComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    MapAppUserComponent,
    ReceiveFormComponent,
    ServerComponent,
    EmployeeComponent,
    MapUserWorkorderComponent,
    DeptDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,

    //AngularFileUploaderModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }





