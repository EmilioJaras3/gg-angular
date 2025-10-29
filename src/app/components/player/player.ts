import { Component } from '@angular/core';
import { Playlist } from '../../services/playlist';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.html',
  styleUrl: './player.css',
})
export class Player {

  private tracklist: any[] = [];
  private currentTrackIndex = 0;
  private isPlaying = false;
  public currentTrack: any;

  constructor(private playlistService: Playlist) {
    this.playlistService.tracklist$.subscribe(tracklist => {
      this.tracklist = tracklist;
      this.currentTrackIndex = 0;
      if (this.isPlaying) {
        this.play();
      }
    });
  }

  play() {
    if (this.tracklist.length > 0) {
      this.isPlaying = true;
      this.currentTrack = this.tracklist[this.currentTrackIndex];
      console.log(`Playing: ${this.currentTrack.name}`);
    } else {
      console.log('No tracks to play.');
    }
  }

  pause() {
    this.isPlaying = false;
    console.log('Playback paused.');
  }

  next() {
    if (this.tracklist.length > 0) {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracklist.length;
      if (this.isPlaying) {
        this.play();
      }
    }
  }

  previous() {
    if (this.tracklist.length > 0) {
      this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracklist.length) % this.tracklist.length;
      if (this.isPlaying) {
        this.play();
      }
    }
  }
}
