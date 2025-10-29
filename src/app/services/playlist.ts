import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Playlist {
  private tracklistSource = new Subject<any[]>();

  tracklist$ = this.tracklistSource.asObservable();

  updateTracklist(tracklist: any[]) {
    this.tracklistSource.next(tracklist);
  }
}
