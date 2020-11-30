import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Amplify } from 'aws-amplify';

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
import { PointsPipe } from './shared/points.pipe';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserComponent } from './user/user.component';
import { NewFriendComponent } from './friends/friends-list/new-friend/new-friend.component';
import { InviteComponent } from './friends/shared-goals/invite/invite.component';
import { GoalDetailComponent } from './goals/goal/goal-detail/goal-detail.component';
import { InvitationsComponent } from './friends/incoming-invitations/invitations.component';
import { FriendRequestComponent } from './friends/incoming-invitations/friend-request/friend-request.component';
import { GoalInvitationComponent } from './friends/incoming-invitations/goal-invitation/goal-invitation.component';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: 'eu-central-1',
    userPoolId: 'eu-central-1_KB4rWDaWw',
    userPoolWebClientId: '5oq2m7qblv38s5t61fi4lvno70',
    authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
});

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
    LoginComponent,
    SignupComponent,
    UserComponent,
    NewFriendComponent,
    InviteComponent,
    GoalDetailComponent,
    InvitationsComponent,
    FriendRequestComponent,
    GoalInvitationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule
  ],
  entryComponents: [
    NewFriendComponent,
    InviteComponent,
    GoalDetailComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
