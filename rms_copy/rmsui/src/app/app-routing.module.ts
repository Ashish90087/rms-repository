import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { UserComponent } from './user/user.component';
import { DepartmentComponent } from './department/department.component';
import { ApplicationComponent } from './application/application.component';
import { DatabaseComponent } from './database/database.component';
import { HomeComponent } from './home/home.component';
import { MapAppUserComponent } from './map-app-user/map-app-user.component';
import { ReceiveFormComponent } from './receive-form/receive-form.component';
import { ServerComponent } from './server/server.component';
import { EmployeeComponent } from './employee/employee.component';
import { MapUserWorkorderComponent } from './map-user-workorder/map-user-workorder.component';
import { IssueFormComponent } from './issue-form/issue-form.component';
import { ReturnStockComponent } from './return-stock/return-stock.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeeklyWorkDoneComponent } from './weekly-work-done/weekly-work-done.component';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
import { AppDescriptionComponent } from './app-description/app-description.component';
import { AppReportComponent } from './app-report/app-report.component';
import { DbReportComponent } from './db-report/db-report.component';
import { EmpReportComponent } from './emp-report/emp-report.component';
import { ReportsComponent } from './reports/reports.component';
import { LoginGuard } from './services/login.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ServerReportComponent } from './server-report/server-report.component';
import { StockReportComponent } from './stock-report/stock-report.component';
import { MachineAccessComponent } from './machine-access/machine-access.component';



const routes: Routes = [

{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard],
 
children: [

  { path: 'user', component: UserComponent , canActivate: [AuthGuard]},
  { path: 'department', component: DepartmentComponent ,canActivate: [AuthGuard] },
  { path: 'application', component: ApplicationComponent,canActivate: [AuthGuard] },
  { path: 'project', component: AppDescriptionComponent,canActivate: [AuthGuard] },
  { path : 'database' , component: DatabaseComponent ,canActivate: [AuthGuard]},
  { path : 'map-app-user' , component: MapAppUserComponent ,canActivate: [AuthGuard]},
  { path : 'receive' , component: ReceiveFormComponent ,canActivate: [AuthGuard]},
  { path : 'server' , component: ServerComponent,canActivate: [AuthGuard]},
  { path : 'emp' , component: EmployeeComponent,canActivate: [AuthGuard]},
  { path : 'mapwo' , component: MapUserWorkorderComponent ,canActivate: [AuthGuard]},
  { path : 'issue' , component: IssueFormComponent ,canActivate: [AuthGuard]},
  { path : 'return' , component: ReturnStockComponent ,canActivate: [AuthGuard]},
  { path : 'task' , component: WeeklyWorkDoneComponent ,canActivate: [AuthGuard]},
  { path : 'admin' , component: WelcomeAdminComponent,canActivate: [AuthGuard]},
  { path : 'employee' , component: WelcomeUserComponent,canActivate: [AuthGuard]},
  { path : 'return' , component: ReturnStockComponent,canActivate: [AuthGuard]},
  { path : 'appreport' , component: AppReportComponent,canActivate: [AuthGuard] },
  { path : 'dbreport' , component: DbReportComponent,canActivate: [AuthGuard] },
  { path : 'serverreport' , component: ServerReportComponent,canActivate: [AuthGuard] },
  { path : 'empreport' , component: EmpReportComponent,canActivate: [AuthGuard] },
  { path : 'stockreport' , component: StockReportComponent,canActivate: [AuthGuard] },
  { path : 'report' , component: ReportsComponent,canActivate: [AuthGuard] },
  { path : 'password' , component: ChangePasswordComponent,canActivate: [AuthGuard] },
  { path : 'machine-access', component:MachineAccessComponent,canActivate:[AuthGuard]}  

 ]

},


{ path : 'login' , component: LoginComponent,canActivate: [LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard,LoginGuard]
})
export class AppRoutingModule { }
