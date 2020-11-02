import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { GoalsComponent } from './goals/goals.component';
import { FriendsComponent } from './friends/friends.component';
import { NewGoalComponent } from './goals/new-goal/new-goal.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'goals', component: GoalsComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'new-goal', component: NewGoalComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
