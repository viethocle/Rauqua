import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from 'rxjs';
import { CategoryService } from '../../services/category/category.service'
import { Category } from '../../models/category'
import * as _ from "lodash"

@Component({
  selector: 'app-categoty',
  templateUrl: './categoty.component.html',
  styleUrls: ['./categoty.component.css']
})
export class CategotyComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.categoryService.getCategory()
      .subscribe(res => {
        this.categories = res;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  deleteCategory(id: number){
    this.categoryService.deleteCategory(id)
    .subscribe(res => {
      this.categories = _.reject(this.categories, ["id", id]);
    })
  }

}
