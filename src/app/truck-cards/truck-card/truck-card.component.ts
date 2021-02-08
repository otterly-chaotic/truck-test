import { Component, Input, OnInit } from '@angular/core';
import { MappedTruck } from 'src/app/models/mapped-truck';

@Component({
  selector: 'app-truck-card',
  templateUrl: './truck-card.component.html',
  styleUrls: ['./truck-card.component.sass'],
})
export class TruckCardComponent implements OnInit {
  @Input() truck: MappedTruck;

  constructor() {}

  ngOnInit(): void {}
}
