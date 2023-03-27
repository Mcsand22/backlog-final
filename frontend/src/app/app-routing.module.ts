import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./componentes/index/index.component";
import {LoginComponent} from "./componentes/login/login.component";
import {RegisterComponent} from "./componentes/register/register.component";
import {HomeComponent} from "./componentes/home/home.component";
import {BoardComponent} from "./componentes/board/board.component";
import {ProfileComponent} from "./componentes/profile/profile.component";
import {AuthGuard} from "./auth.guard";
import {NoAuthGuardGuard} from "./no-auth-guard.guard";
import {TodoComponent} from "./componentes/board/todo/todo.component";

const routes: Routes = [
  {path: '', component: IndexComponent, canActivate: [NoAuthGuardGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuardGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NoAuthGuardGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'board', component: BoardComponent, canActivate: [AuthGuard]},
  { path: 'board/:boardId', component: BoardComponent, canActivate: [AuthGuard] },
  { path: 'board/:boardId', component: TodoComponent },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'index', component: IndexComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
