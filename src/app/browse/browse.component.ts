import { Component, OnInit } from '@angular/core';
import { BrowseService } from '../features/browse/services/browse.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  background_bg: string;
  header_video_url: string;
  username: string;
  video_title: string;
  video_description: string;
  // variables for the data
  public tvShows!: any[];
  public trendingNow!: any[];
  public releases!: any[];
  public anime!: any[];
  public movies!: any[];

  constructor(private readonly _api: BrowseService) {
    this.header_video_url =
      'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4';
    this.username = 'RYUZVKI';
    this.video_title = 'narcos';
    this.video_description =
      "A gritty chronicle of the war against Colombia's infamously violent and powerful drug cartels.";
    this.background_bg =
      'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4';
  }

  async ngOnInit() {
    this.tvShows = await this._api.load('Tv Shows');
    this.trendingNow = await this._api.load('Trending Now');
    this.releases = await this._api.load('New Releases');
    this.anime = await this._api.load('Anime');
    this.movies = await this._api.load('Movies');
  }
}
