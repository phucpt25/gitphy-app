import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  constructor(private  http: HttpClient) { }

  getGifs(offset: number) {
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.apiGiphyKey}&limit=25&offset=${offset}`);
  }
  searchGif(key: string) {
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${environment.apiGiphyKey}&q=${key}&limit=25&offset=0&lang=en`)
  }
}
