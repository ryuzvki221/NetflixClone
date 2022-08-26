import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowseRoutingModule } from './browse-routing.module';
import { IonicModule } from '@ionic/angular';
import { BrowseComponent } from 'src/app/browse/browse.component';
import { BrowseService } from './services/browse.service';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [BrowseComponent, ModalComponent],
  imports: [CommonModule, IonicModule, BrowseRoutingModule, HttpClientModule],
  providers: [BrowseService],
})
export class BrowseModule {}
