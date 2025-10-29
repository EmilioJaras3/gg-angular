import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Player } from './components/player/player';
import { Search } from './components/search/search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Player, Search],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gg');
}
