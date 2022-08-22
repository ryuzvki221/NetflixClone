import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class BrowseService {
  constructor(private readonly _http: HttpClient) {}
  async load(
    options: 'Tv Shows' | 'Trending Now' | 'New Releases' | 'Anime' | 'Movies'
  ) {
    let url!: string;
    // constructions the url based on the options
    switch (options) {
      case 'Tv Shows':
        url =
          environment.apiUrl +
          '/tv/popular?api_key=${environment.apiKey}&language=en-US&page=1';
        break;
      case 'Trending Now':
        url =
          environment.apiUrl +
          '/trending/all/week?api_key=${environment.apiKey}&language=en-US';
        break;
      case 'New Releases':
        url =
          environment.apiUrl +
          '/discover/movie?api_key=${environment.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
        break;
      case 'Anime':
        url =
          environment.apiUrl +
          '/discover/tv?api_key=${environment.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
        break;
      case 'Movies':
        url =
          environment.apiUrl +
          '/discover/movie?api_key=${environment.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
        break;
      default:
        break;
    }

    if (!url) {
      //gestion d'erreur;
      throw new Error('load request error: need an option to make a request');
    }
    // return the response of the request
    const browsers = await new Promise((resolve) => {
      this._http
        .get<{ results: any[] }>(url)
        .pipe(
          // data formating
          map((response) => response.results),
          map((results) => {
            if (!results) {
              return [];
            }
            return results.map((result) => {
              if (!result.poster_path || !result.backdrop_path) return result;
              result.poster_path = environment.imgUrl + `${result.poster_path}`;
              result.backdrop_path =
                environment.imgUrl + `${result.backdrop_path}`;
              return result;
            });
          })
        )
        .pipe(first())
        .subscribe((res) => {
          resolve(res);
        });
    });
    return browsers;
  }
}
