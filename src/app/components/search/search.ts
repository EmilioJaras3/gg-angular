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
  loading = false;
  errorMsg = '';

  constructor(private spotifyService: Spotify, private playlistService: Playlist) {}

  search() {
    const q = (this.searchQuery || '').trim();
    if (!q) {
      this.searchResults = [];
      this.errorMsg = '';
      return;
    }
    this.loading = true;
    this.errorMsg = '';
    this.spotifyService.searchTracks(q).subscribe({
      next: (data: any) => {
        const items = (data && data.tracks && data.tracks.items) || [];
        this.searchResults = items;
        this.playlistService.updateTracklist(items);
        this.loading = false;
        if (!items.length) {
          this.errorMsg = 'Sin resultados';
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.searchResults = [];
        this.errorMsg = (err && (err.error?.error || err.message)) || 'Error al buscar';
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
