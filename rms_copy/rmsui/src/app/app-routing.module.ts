import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsComponent } from './forms/forms.component';
import { TestComponent } from './test/test.component';
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
<<<<<<< HEAD
import { ReturnStockComponent } from './return-stock/return-stock.component';
=======
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeeklyWorkDoneComponent } from './weekly-work-done/weekly-work-done.component';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
>>>>>>> main

const routes: Routes = [

{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
<<<<<<< HEAD
{ path: 'user', component: UserComponent },
{ path: 'department', component: DepartmentComponent },
{ path: 'application', component: ApplicationComponent },
{ path : 'database' , component: DatabaseComponent},
{ path : 'map-app-user' , component: MapAppUserComponent},
{ path : 'receive' , component: ReceiveFormComponent},
{ path : 'server' , component: ServerComponent},
{ path : 'emp' , component: EmployeeComponent},
{ path : 'mapwo' , component: MapUserWorkorderComponent},
{ path : 'issue' , component: IssueFormComponent},
{ path : 'return' , component: ReturnStockComponent}
=======
{ path: 'dashboard', component: DashboardComponent ,
 children: [

  { path: 'user', component: UserComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'application', component: ApplicationComponent },
  { path : 'database' , component: DatabaseComponent},
  { path : 'map-app-user' , component: MapAppUserComponent},
  { path : 'receive' , component: ReceiveFormComponent},
  { path : 'server' , component: ServerComponent},
  { path : 'emp' , component: EmployeeComponent},
  { path : 'mapwo' , component: MapUserWorkorderComponent},
  { path : 'issue' , component: IssueFormComponent},
  { path : 'task' , component: WeeklyWorkDoneComponent},
  { path : 'admin' , component: WelcomeAdminComponent},
  { path : 'employee' , component: WelcomeUserComponent},

 ]

},


{ path : 'login' , component: LoginComponent},
>>>>>>> main

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
