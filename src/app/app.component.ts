import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

//model
import { MappedTruck } from './models/mapped-truck';

//service
import { DataProviderService } from './services/data-provider.service';

//rxjs
import { Observable } from 'rxjs/internal/Observable';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/internal/operators/map';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { concat } from 'rxjs/internal/observable/concat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  filterInput = new FormControl();
  trucks$: Observable<MappedTruck[]>;
  title = 'Truck Tracker';

  constructor(private dataService: DataProviderService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const filteredTrucks$ = this.filterInput.valueChanges.pipe(
      tap((value) => console.log(value)),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((filterValue) => this.dataService.filterTrucks$(filterValue)),
      tap((value) => console.log(value))
    );

    const unfilteredTrucks$ = this.dataService.filterTrucks$();

    this.trucks$ = concat(unfilteredTrucks$, filteredTrucks$);
  }
}
