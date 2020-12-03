import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalsComponent } from './goals/goals.component';
import { FriendsComponent } from './friends/friends.component';
import { NewGoalComponent } from './goals/new-goal/new-goal.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent } from './user/user.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {path: '', component: GoalsComponent, canActivate: [AuthGuard]},
  {path: 'goals', component: GoalsComponent, canActivate: [AuthGuard]},
  {path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]},
  {path: 'history', component: HistoryComponent, canActivate: [AuthGuard]},
  {path: 'new-goal', component: NewGoalComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
