import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  private truckTrack = '../assets/trucktimeline.json';

  constructor(private http: HttpClient) {
    this.getTrucks$().subscribe((data) => console.log(data));
    this.getOrders$().subscribe((data) => console.log(data));
  }

  getData$(): Observable<any> {
    return this.http.get(this.truckTrack);
  }

  getTrucks$() {
    return this.getData$().pipe(map((data) => data['trucks']));
  }

  getOrders$() {
    return this.getData$().pipe(map((data) => data['orders']));
  }
}
