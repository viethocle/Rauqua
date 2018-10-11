import { Hero } from './../../models/hero';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor() { }
  getHeroes(): Hero {
    const newHero = new Hero();
    newHero.id = 1;
    newHero.name = 'Hero 1';
    return newHero;
  }
}
