import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { GoalsComponent } from './goals/goals.component';
import { GoalComponent } from './goals/goal/goal.component';
import { CharacterComponent } from './goals/character/character.component';
import { FriendsComponent } from './friends/friends.component';
import { SharedGoalsComponent } from './friends/shared-goals/shared-goals.component';
import { FriendsListComponent } from './friends/friends-list/friends-list.component';
import { FriendsItemComponent } from './friends/friends-list/friends-item/friends-item.component';
import { SharedGoalComponent } from './friends/shared-goals/shared-goal/shared-goal.component';
import { NewGoalComponent } from './goals/new-goal/new-goal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PointsPipe } from './shared/points.pipe';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    WelcomeComponent,
    GoalsComponent,
    GoalComponent,
    CharacterComponent,
    FriendsComponent,
    SharedGoalsComponent,
    FriendsListComponent,
    FriendsItemComponent,
    SharedGoalComponent,
    NewGoalComponent,
    PointsPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
