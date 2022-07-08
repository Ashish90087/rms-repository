import { NgModule } from '@angular/core';
//import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from './user/user.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxPrintModule } from 'ngx-print';
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
import { IssueFormComponent } from './issue-form/issue-form.component';
import { ReturnStockComponent } from './return-stock/return-stock.component';
import { WeeklyWorkDoneComponent } from './weekly-work-done/weekly-work-done.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
import { AppDescriptionComponent } from './app-description/app-description.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ReportsComponent } from './reports/reports.component';
import { AppReportComponent } from './app-report/app-report.component';
import { DbReportComponent } from './db-report/db-report.component';
import { EmpReportComponent } from './emp-report/emp-report.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ServerReportComponent } from './server-report/server-report.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MachineAccessComponent } from './machine-access/machine-access.component';
import { StockReportComponent } from './stock-report/stock-report.component';



//import { AngularFileUploaderModule } from "angular-file-uploader";




@NgModule({
  declarations: [
    AppComponent,
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
    IssueFormComponent,
    ReturnStockComponent,
    WeeklyWorkDoneComponent,
    LoginComponent,
    DashboardComponent,
    WelcomeAdminComponent,
    WelcomeUserComponent,
    AppDescriptionComponent,
    ReportsComponent,
    AppReportComponent,
    DbReportComponent,
    EmpReportComponent,
    ChangePasswordComponent,
    ServerReportComponent,
    MachineAccessComponent,
    StockReportComponent
  ],
  imports: [
    NgbDatepickerModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableExporterModule,
    NgxPrintModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    PdfViewerModule,
    NgSelectModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('token');
        },
        // whitelistedDomains: ['localhost:3000'],
        // blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    }),

    //AngularFileUploaderModule
  ],
  providers: [DatePipe,{
    provide: LocationStrategy,
    useClass: HashLocationStrategy,

  }
] ,
  bootstrap: [AppComponent],
})
export class AppModule { }





