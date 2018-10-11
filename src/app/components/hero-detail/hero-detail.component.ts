import { Hero } from './../../models/hero';
import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../../services/hero/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heroService: HeroService) {
    this.hero = heroService.getHeroes();
  }

  ngOnInit() {
  }

}
