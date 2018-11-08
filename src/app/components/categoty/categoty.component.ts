import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoryService } from '../../services/category/category.service'
import { Category } from '../../models/category'
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms'
import * as _ from "lodash"
import { BsModalComponent } from 'ng2-bs3-modal';
// import 'jquery';
// import 'bootstrap';

@Component({
  selector: 'app-categoty',
  templateUrl: './categoty.component.html',
  styleUrls: ['./categoty.component.css']
})
export class CategotyComponent implements OnInit {
  @ViewChild('modal') modal: BsModalComponent;
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject()
  categories: Category[] = []
  form: FormGroup
  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.buildForm()
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.categoryService.getCategory()
      .subscribe(res => {
        this.categories = res
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next()
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe()
  }

  buildForm() {
    this.form = this.fb.group(
      {
        name: ["", Validators.compose([Validators.required ,Validators.minLength(2)]) ],
      }
    )
  }
  
  deleteCategory(id: number){
    this.categoryService.deleteCategory(id)
    .subscribe(res => {
      this.categories = _.reject(this.categories, ["id", id])
    })
  }

}
