import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BrowseService {
  constructor(private readonly _http: HttpClient) {}
  async load(
    option: 'Tv Shows' | 'Trending Now' | 'New Releases' | 'Anime' | 'Movies'
  ) {
    let url!: string;
    // constructions the url based on the options
    switch (option) {
      case 'Tv Shows':
        url =
          environment.apiUrl +
          `/tv/popular?api_key=${environment.apiKey}&language=en-US&page=1`;
        break;
      case 'Trending Now':
        url =
          environment.apiUrl +
          `/trending/all/week?api_key=${environment.apiKey}&language=en-US`;
        break;
      case 'New Releases':
        url =
          environment.apiUrl +
          `/discover/movie?api_key=${environment.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
        break;
      case 'Anime':
        url =
          environment.apiUrl +
          `/discover/tv?api_key=${environment.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
        break;
      case 'Movies':
        url =
          environment.apiUrl +
          `/discover/movie?api_key=${environment.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
        break;
      default:
        break;
    }

    if (!url) {
      //gestion d'erreur;
      throw new Error('load request error: need an option to make a request');
    }
    // return the response of the request
    const browsers = await lastValueFrom(
      this._http.get<{ results: any[] }>(url).pipe(
        map((response) => response.results),
        map((results: any[]) => {
          if (!results) {
            return [];
          }
          return results.map((res) => {
            if (!res.poster_path || !res.backdrop_path) return res;
            res.backdrop_path = environment.imgUrl + `${res.backdrop_path}`;
            res.poster_path = environment.imgUrl + `${res.poster_path}`;
            return res;
          });
        })
      )
    );
    return browsers;
  }
}
