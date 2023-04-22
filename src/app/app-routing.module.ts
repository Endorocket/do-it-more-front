import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalsComponent } from './goals/goals.component';
import { FriendsComponent } from './friends/friends.component';
import { NewGoalComponent } from './goals/new-goal/new-goal.component';
import { UserComponent } from './user/user.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {path: '', component: GoalsComponent},
  {path: 'goals', component: GoalsComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'new-goal', component: NewGoalComponent},
  {path: 'user', component: UserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
