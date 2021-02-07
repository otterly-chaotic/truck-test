import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DataProviderService {
  private path = 'src/assets/trucktimeline.json';

  constructor(private http: HttpClient) {
    this.getData(this.path).subscribe(console.log);
  }

  getData(path: string): Observable<any> {
    return this.http.get(path);
  }
}
