import { Injectable } from '@angular/core';
import { GoalType } from '../model/goal-type.enum';
import { SharedGoal } from './shared-goals/shared-goal.model';
import { Frequency } from '../model/frequency.enum';
import { UserService } from '../user/user.service';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Friend, FriendsAndTeamsData, InvitationStatus } from './friend.model';
import { InvitationData } from './invitations/invitation-data.model';

@Injectable({providedIn: 'root'})
export class FriendsService {

  constructor(private userService: UserService, private authService: AuthService, private http: HttpClient) {
  }

  private friends: Friend[] = [];
  private sharedGoals: SharedGoal[] = [];

  private invitations: InvitationData = {
    friendRequests: [
      {
        senderName: 'Piotr',
        senderAvatar: 'fox'
      }
    ],
    goalInvitations: [
      {
        senderName: 'Damian',
        senderAvatar: 'fox',
        goal: {
          id: '1',
          name: 'Siłownia',
          icon: 'fas fa-dumbbell',
          frequency: Frequency.WEEKLY,
          totalTimes: 5,
          type: GoalType.PHYSICAL,
          points: 2
        },
      }
    ]
  };

  friendsChanged = new Subject<Friend[]>();
  addFriendCompleted = new Subject<boolean>();

  getFriends(): Friend[] {
    return this.friends.slice();
  }

  setFriends(friends: Friend[]): void {
    this.friends = friends;
    this.friendsChanged.next(this.getFriends());
  }

  getSharedGoals(): SharedGoal[] {
    return this.sharedGoals.slice();
  }

  getInvitations(): InvitationData {
    return {...this.invitations};
  }

  getNumberOfInvitations(): number {
    return this.invitations.friendRequests.length + this.invitations.goalInvitations.length;
  }

  async addFriend(username: string): Promise<void> {
    const idToken = await this.authService.getIdToken();
    this.http.post(environment.apiUrl + '/friends',
      {
        friendUsername: username
      }, {
        headers: {
          Authorization: idToken
        }
      }).subscribe(data => {
      console.log(data);
      this.addFriendCompleted.next(true);
      this.fetchFriendsAndTeams(true);
    }, error => {
      console.log(error);
      this.addFriendCompleted.next(false);
    });
  }

  inviteToSharedGoal(goalName: string, username: string): void {
    // TODO
  }

  async fetchFriendsAndTeams(forceFetch: boolean = false): Promise<void> {
    if (this.friends.length > 0 && !forceFetch) {
      console.log('not fetching');
      this.friendsChanged.next(this.getFriends());
      return;
    }
    console.log('fetching');
    const idToken = await this.authService.getIdToken();
    this.http.get<FriendsAndTeamsData>(environment.apiUrl + '/friends',
      {
        headers: {
          Authorization: idToken
        }
      }).subscribe(data => {
      console.log(data);
      data.friends.forEach(friend => {
        friend.progress.forEach(progress => {
          progress.type = GoalType.getByName(progress.type.toString());
        });
        friend.status = InvitationStatus[friend.status];
      });
      this.setFriends(data.friends);
      data.teams.forEach(sharedGoal => {
        sharedGoal.goal.frequency = Frequency[sharedGoal.goal.frequency];
        sharedGoal.goal.type = GoalType.getByName(sharedGoal.goal.type.toString());
      });
      this.sharedGoals = data.teams;
    }, error => {
      console.log(error);
    });
  }
}
