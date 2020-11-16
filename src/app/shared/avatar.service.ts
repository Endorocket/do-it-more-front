import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AvatarService {
  private availableAvatarsPaths: string[];

  constructor() {
    this.availableAvatarsPaths = [
      '/assets/images/avatars/bull.svg',
      '/assets/images/avatars/chick.svg',
      '/assets/images/avatars/crab.svg',
      '/assets/images/avatars/fox.svg',
      '/assets/images/avatars/hedgehog.svg',
      '/assets/images/avatars/hippopotamus.svg',
      '/assets/images/avatars/koala.svg',
      '/assets/images/avatars/lemur.svg',
      '/assets/images/avatars/pig.svg',
      '/assets/images/avatars/tiger.svg',
      '/assets/images/avatars/whale.svg',
      '/assets/images/avatars/zebra.svg',
    ];
  }

  getAvailableAvatarsPaths(): string[] {
    return this.availableAvatarsPaths.slice();
  }

  getAvatarPath(avatarName: string): string {
    return `/assets/images/avatars/${ avatarName }.svg`;
  }

  getAvatarNameFromPath(avatarPath: string): string {
    const startIndex = avatarPath.lastIndexOf('/') + 1;
    const endIndex = avatarPath.lastIndexOf('.svg');
    return avatarPath.substring(startIndex, endIndex);
  }
}
