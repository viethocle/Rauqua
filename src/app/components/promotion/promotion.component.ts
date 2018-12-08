import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { PromotionService } from "../../services/promotion/promotion.service";
import * as _ from "lodash";

@Component({
  selector: "app-promotion",
  templateUrl: "./promotion.component.html",
  styleUrls: ["./promotion.component.css"]
})
export class PromotionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  promotions: any[] = [];

  constructor(private promotionService: PromotionService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10
    };

    this.getListPromotion();
  }

  getListPromotion() {
    this.promotionService.getPromotion().subscribe(res => {
      this.promotions = res;
      this.dtTrigger.next();
    });
  }
  
  openModalAddPromotion() {}

  deletePromotion(id: number) {
    this.promotionService.deletePromotion(id).subscribe(res => {
      this.promotions = _.reject(this.promotions, ["id", id]);
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
