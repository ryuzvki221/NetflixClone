import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { IonContent, IonToolbar, ModalController } from '@ionic/angular';
import { ModalComponent } from '../features/browse/modal/modal.component';
import { BrowseService } from '../features/browse/services/browse.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit, AfterViewInit {
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

  @ViewChild(IonContent, { static: false }) content!: IonContent;
  @ViewChild(IonToolbar, { read: ElementRef }) toolbar!: ElementRef<IonToolbar>;

  constructor(
    private readonly _api: BrowseService,
    private readonly _renderer: Renderer2,
    private readonly _modalCtrl: ModalController
  ) {
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
    this.background_bg = this.trendingNow[0].backdrop_path;
    this.title = this.trendingNow[0].name;
    this.description = this.trendingNow[0].overview;
  }
  ngAfterViewInit(): void {
    if (this.content === undefined) return;
    // enable scroll
    this.content.scrollEvents = true;
  }

  listenScroll($event: any) {
    const {
      detail: { currentY },
    } = $event;
    if (!currentY) return;
    const alfaY = currentY > 95 ? 1 : currentY / 100;
    //apply bg color an class toggle logic
    this._renderer.setStyle(
      this.toolbar?.nativeElement,
      'background-color',
      `rgba(0, 0, 0, ${alfaY})`
    );
  }

  async displayDetails(item: any) {
    //open modal
    const modal = await this._modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        selected: { ...item },
        hidden: false,
      },
      cssClass: ['preview-modal'],
    });
    return await modal.present();
  }
}
