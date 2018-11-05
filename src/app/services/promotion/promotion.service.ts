import { DataService } from './../common/data.service';
import { Injectable } from '@angular/core';
import { apiURL } from '../../constants/apiUrl';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private dataService: DataService,
  ) { }

  getPromotion(): Observable<any> {
    const resource = {
      body: null,
      url: apiURL.promotion.all
    };
    return  this.dataService.get(resource)
    .pipe(
      map(res => {
        return res.result
      })
    )
  }

  deletePromotion(id: number): Observable<any>  {
    const resource = {
      body: null,
      url: apiURL.promotion.delete + id.toString()
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
