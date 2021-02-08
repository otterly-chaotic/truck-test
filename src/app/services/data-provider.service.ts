import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Truck } from '../models/truck';
import { Order } from '../models/order';
import { MappedTruck } from '../models/mapped-truck';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  private truckTrack = '../assets/trucktimeline.json';

  constructor(private http: HttpClient) {
    this.trucksWithOrders$().subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }

  getData$(): Observable<any> {
    return this.http.get(this.truckTrack);
  }

  trucksWithOrders$(): Observable<MappedTruck[]> {
    return this.getData$().pipe(
      map((data) => {
        return data['trucks'].map((truck: Truck) => {
          const truckOrders = this.filterOrders(
            data['orders'],
            truck.assignedOrderId
          );
          return { name: truck.name, orders: truckOrders };
        });
      })
    );
  }

  private filterOrders(orders: Order[], truckOrderIds: string[]) {
    return orders.filter((order) =>
      truckOrderIds.find((truckOrderId) => truckOrderId === order.id)
    );
  }
}
