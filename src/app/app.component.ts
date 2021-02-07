import { Component } from '@angular/core';
import { DataProviderService } from './data-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'truck-test';

  constructor(private dataService: DataProviderService) {}

  ngOninit() {}
}
