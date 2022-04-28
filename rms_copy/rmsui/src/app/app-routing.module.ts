import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
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
import { ReturnStockComponent } from './return-stock/return-stock.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeeklyWorkDoneComponent } from './weekly-work-done/weekly-work-done.component';
import { WelcomeAdminComponent } from './welcome-admin/welcome-admin.component';
import { WelcomeUserComponent } from './welcome-user/welcome-user.component';
import { AppDescriptionComponent } from './app-description/app-description.component';

const routes: Routes = [

{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'dashboard', component: DashboardComponent ,
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
  { path : 'admin' , component: WelcomeAdminComponent},
  { path : 'employee' , component: WelcomeUserComponent},
  { path : 'return' , component: ReturnStockComponent},

 ]

},


{ path : 'login' , component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
