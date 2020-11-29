import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FriendsService } from '../../friends.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-friend',
  templateUrl: './new-friend.component.html',
  styleUrls: ['./new-friend.component.css']
})
export class NewFriendComponent implements OnInit {
  username: string;

  constructor(public dialogRef: MatDialogRef<NewFriendComponent>,
              private friendsService: FriendsService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onAddFriend(): Promise<void> {
    const subscription = this.friendsService.addFriendCompleted.subscribe((success: boolean) => {
      if (success) {
        console.log('Zaproszono znajomego');
        this.snackBar.open('Wysłano zaproszenie do użytkownika: ' + this.username, null, {
          duration: 2000,
        });
        this.dialogRef.close();
      } else {
        console.log('Nie istnieje taki użytkownik');
        this.snackBar.open('Nie istnieje taki użytkownik: ' + this.username, null, {
          duration: 2000,
        });
      }
      subscription.unsubscribe();
    });
    this.dialogRef.close();
    await this.friendsService.addFriend(this.username);
  }
}
