import { Injectable } from '@angular/core';
import { DataService } from "./../common/data.service";
import { Observable } from 'rxjs';
import { Resource } from '../../models/resource';
import { apiURL } from '../../constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private dataService: DataService) {}

  
}
