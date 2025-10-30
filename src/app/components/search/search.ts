import { Component } from '@angular/core';
import { Spotify } from '../../services/spotify';
import { Playlist } from '../../services/playlist';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchResults: any[] = [];
  searchQuery: string = '';
  audio: HTMLAudioElement | null = null;

  constructor(private spotifyService: Spotify, private playlistService: Playlist) {}

  search() {
    console.log('[search] query=', this.searchQuery);
    this.spotifyService.searchTracks(this.searchQuery).subscribe({
      next: (data: any) => {
        console.log('[search] response', data && data.tracks && data.tracks.items && data.tracks.items.length);
        this.searchResults = (data && data.tracks && data.tracks.items) || [];
        this.playlistService.updateTracklist(this.searchResults);
      },
      error: (err: any) => {
        console.error('[search] error', err);
      }
    });
  }

  playPreview(track: any) {
    if (!track || !track.preview_url) {
      console.warn('No preview available for this track');
      return;
    }
    try {
      if (!this.audio) this.audio = new Audio();
      // If playing a different preview, switch source and play
      if (this.audio.src !== track.preview_url) {
        this.audio.src = track.preview_url;
        this.audio.play();
      } else {
        // Toggle play/pause
        if (this.audio.paused) this.audio.play();
        else this.audio.pause();
      }
    } catch (e) {
      console.error('Audio play failed', e);
    }
  }
}
