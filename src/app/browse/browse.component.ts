import { Component, OnInit } from '@angular/core';
import { BrowseService } from '../features/browse/services/browse.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  background_bg!: string;
  username: string;
  title!: string;
  description!: string;
  // variables for the data
  public tvShows!: any[];
  public trendingNow!: any[];
  public releases!: any[];
  public anime!: any[];
  public movies!: any[];

  constructor(private readonly _api: BrowseService) {
    this.username = 'RYUZVKI';
    this.description =
      "A gritty chronicle of the war against Colombia's infamously violent and powerful drug cartels.";
  }

  async ngOnInit() {
    this.tvShows = await this._api.load('Tv Shows');
    this.trendingNow = await this._api.load('Trending Now');
    this.releases = await this._api.load('New Releases');
    this.anime = await this._api.load('Anime');
    this.movies = await this._api.load('Movies');
    this.background_bg =this.trendingNow[0].backdrop_path;
    this.title = this.trendingNow[0].name;
    this.description = this.trendingNow[0].overview;
  }
}
