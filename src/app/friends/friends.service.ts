import { Injectable } from '@angular/core';
import { GoalType } from '../model/goal-type.enum';
import { MemberStatus, SharedGoal } from './shared-goals/shared-goal.model';
import { Frequency } from '../model/frequency.enum';
import { UserService } from '../user/user.service';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Friend, FriendsAndTeamsData, InvitationResponse, InvitationStatus } from './friend.model';

@Injectable({providedIn: 'root'})
export class FriendsService {

  constructor(private userService: UserService, private authService: AuthService, private http: HttpClient) {
  }

  private friends: Friend[] = [];
  private acceptedTeams: SharedGoal[] = [];
  private sentInvitationTeams: SharedGoal[] = [];
  private incomingInvitationTeams: SharedGoal[] = [];

  friendsChanged = new Subject<void>();
  teamsChanged = new Subject<void>();
  incomingInvitationTeamsChanged = new Subject<void>();

  addFriendCompleted = new Subject<boolean>();
  inviteToSharedGoalCompleted = new Subject<boolean>();
  respondToFriendInvitationCompleted = new Subject<boolean>();
  respondToTeamInvitationCompleted = new Subject<boolean>();

  getFriendsByStatus(invitationStatus: InvitationStatus): Friend[] {
    return this.friends.slice().filter(friend => friend.status === invitationStatus);
  }

  setFriends(friends: Friend[]): void {
    this.friends = friends;
    this.friendsChanged.next();
  }

  getAcceptedTeams(): SharedGoal[] {
    return this.acceptedTeams.slice();
  }

  setAcceptedTeams(acceptedTeams: SharedGoal[]): void {
    this.acceptedTeams = acceptedTeams;
    this.teamsChanged.next();
  }

  getSentInvitationTeams(): SharedGoal[] {
    return this.sentInvitationTeams.slice();
  }

  setSentInvitationTeams(sentInvitationTeams: SharedGoal[]): void {
    this.sentInvitationTeams = sentInvitationTeams;
    this.teamsChanged.next();
  }

  getIncomingInvitationTeams(): SharedGoal[] {
    return this.incomingInvitationTeams.slice();
  }

  setIncomingInvitationTeams(incomingInvitationTeams: SharedGoal[]): void {
    this.incomingInvitationTeams = incomingInvitationTeams;
    this.incomingInvitationTeamsChanged.next();
  }

  getNumberOfInvitations(): number {
    return this.getFriendsByStatus(InvitationStatus.INVITING).length + this.getIncomingInvitationTeams().length;
  }

  getSharedGoalNames(): string[] {
    return [
      ...this.sentInvitationTeams.map(team => team.goal.name),
      ...this.acceptedTeams.map(team => team.goal.name)
    ];
  }

  async addFriend(username: string): Promise<void> {
    const idToken = await AuthService.getIdToken();
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

  async inviteToSharedGoal(goalId: string, username: string): Promise<void> {
    const idToken = await AuthService.getIdToken();
    this.http.post(environment.apiUrl + '/teams',
      {
        goalId,
        friendUsername: username
      }, {
        headers: {
          Authorization: idToken
        }
      }).subscribe(data => {
      console.log(data);
      this.inviteToSharedGoalCompleted.next(true);
      this.fetchFriendsAndTeams(true);
    }, error => {
      console.log(error);
      this.inviteToSharedGoalCompleted.next(false);
    });
  }

  async fetchFriendsAndTeams(forceFetch: boolean = false): Promise<void> {
    if (this.friends.length > 0 && !forceFetch) {
      console.log('not fetching');
      this.friendsChanged.next();
      return;
    }
    console.log('fetching');
    const idToken = await AuthService.getIdToken();
    this.http.get<FriendsAndTeamsData>(environment.apiUrl + '/friends',
      {
        headers: {
          Authorization: idToken
        }
      }).subscribe(data => {
      console.log(data);
      this.saveFriendsFromResponse(data);
      this.saveTeamsFromResponse(data);
    }, error => {
      console.log(error);
    });
  }

  private saveFriendsFromResponse(data: FriendsAndTeamsData): void {
    data.friends.forEach(friend => {
      friend.progress.forEach(progress => {
        progress.type = GoalType.getByName(progress.type.toString());
      });
      friend.status = InvitationStatus[friend.status];
    });
    this.setFriends(data.friends);
  }

  private saveTeamsFromResponse(data: FriendsAndTeamsData): void {
    const acceptedTeams: SharedGoal[] = [];
    const sentInvitationTeams: SharedGoal[] = [];
    const incomingInvitationTeams: SharedGoal[] = [];
    for (const team of data.teams) {
      console.log(team);
      team.goal.frequency = Frequency[team.goal.frequency];
      team.goal.type = GoalType.getByName(team.goal.type.toString());
      for (const member of team.members) {
        member.status = MemberStatus[member.status];
      }
      if (team.members.filter(member => member.status === MemberStatus.INVITED && member.name === this.userService.getUsername()).length > 0) {
        console.log('incomingInvitationTeams', team);
        incomingInvitationTeams.push(team);
      } else if (team.members.filter(member => member.status === MemberStatus.INVITED && member.name !== this.userService.getUsername()).length > 0) {
        console.log('sentInvitationTeams', team);
        sentInvitationTeams.push(team);
      } else {
        console.log('acceptedTeams', team);
        acceptedTeams.push(team);
      }
    }
    this.setAcceptedTeams(acceptedTeams);
    this.setSentInvitationTeams(sentInvitationTeams);
    this.setIncomingInvitationTeams(incomingInvitationTeams);
  }

  async respondToFriendInvitation(friendUsername: string, invitationResponse: InvitationResponse): Promise<void> {
    const idToken = await AuthService.getIdToken();
    this.http.post(`${environment.apiUrl}/friends/${friendUsername}/respond`,
      {
        invitationResponse
      },
      {
        headers: {
          Authorization: idToken
        },
      }).subscribe(data => {
      console.log(data);
      this.fetchFriendsAndTeams(true);
      this.respondToFriendInvitationCompleted.next(true);
    }, error => {
      console.log(error);
      this.respondToFriendInvitationCompleted.next(false);
    });
  }

  async respondToTeamInvitation(teamId: string, invitationResponse: InvitationResponse): Promise<void> {
    const idToken = await AuthService.getIdToken();
    this.http.post(`${environment.apiUrl}/teams/${teamId}/respond`,
      {
        invitationResponse
      },
      {
        headers: {
          Authorization: idToken
        },
      }).subscribe(data => {
      console.log(data);
      this.fetchFriendsAndTeams(true);
      this.respondToTeamInvitationCompleted.next(true);
    }, error => {
      console.log(error);
      this.respondToTeamInvitationCompleted.next(false);
    });
  }
}
