import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Truck } from './models/truck';
import { Order } from './models/order';
import { MappedTruck } from './models/mapped-truck';

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

  getTrucks$(): Observable<Truck[]> {
    return this.getData$().pipe(map((data) => data['trucks']));
  }

  getOrders$(): Observable<Order[]> {
    return this.getData$().pipe(map((data) => data['orders']));
  }

  trucksWithOrders$(): Observable<MappedTruck[]> {
    return this.getData$().pipe(
      map((data) => {
        const orders: Order[] = data['orders'];
        return data['trucks'].map((truck: Truck) => {
          const truckOrders = orders.filter((order) =>
            truck.assignedOrderId.find((id) => id === order.id)
          );
          return { name: truck.name, orders: [...truckOrders] };
        });
      })
    );
  }
}
