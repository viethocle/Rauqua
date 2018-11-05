import { DataService } from './../common/data.service';
import { Injectable } from '@angular/core';
import { apiURL } from '../../constants/apiUrl';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private dataService: DataService,
  ) { }

  getProduct(): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.product.all
    };
    return  this.dataService.get(resource)
    .pipe(
      map(res => {
        return res.result.data
      })
    )
  }

  deleteProduct(id: number): Observable<any>  {
    const resource = {
      body: null,
      url: apiURL.product.delete + id.toString()
    };
     return this.dataService.delete(resource)
     .pipe(
       map(
         res => {
           return res
         }
       )
     )
  }
}
