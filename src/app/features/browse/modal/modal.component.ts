import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
@Input() public readonly selected!: any;
  constructor(
    public readonly modalCtrl: ModalController

  ) { }

  ngOnInit() {}

}
