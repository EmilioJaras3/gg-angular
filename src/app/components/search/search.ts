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

  constructor(private spotifyService: Spotify, private playlistService: Playlist) {}

  search() {
    this.spotifyService.searchTracks(this.searchQuery).subscribe((data: any) => {
      this.searchResults = data.tracks.items;
      this.playlistService.updateTracklist(this.searchResults);
    });
  }
}
