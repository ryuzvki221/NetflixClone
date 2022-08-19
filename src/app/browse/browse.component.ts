import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  header_video_url: string;
  username: string;
  video_title: string;
  video_description: string;


  constructor() {
    this.header_video_url =
      'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4';
    this.username = 'RYUZVKI';
    this.video_title = 'narcos';
    this.video_description = "A gritty chronicle of the war against Colombia's infamously violent and powerful drug cartels.";
  }

  ngOnInit(): void {}
}
