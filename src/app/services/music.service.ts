import { Injectable } from '@angular/core';
import * as listArtists from "./artists.json"

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  urlServer = "https://musicback.fly.dev/artists"
  constructor() { }

  getArtists(){
    return fetch(`${this.urlServer}/tracks/artist`).then(
      response => response.json()
    );
  }

  getArtistsFromJson(){
    return listArtists;
  }

  getArtistsTracks(artist_id: number){
    return fetch(`${this.urlServer}/tracks/artist/${artist_id}`).then(
      response => response.json()
    );
  }
}
