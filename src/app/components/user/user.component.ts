import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../models/user'
import { UserService } from '../../services/user/user.service'
import * as _ from "lodash"

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users: any[] = []

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.userService.getUser()
      .subscribe(res => {
        this.users = res
        console.log(this.users)
        this.dtTrigger.next()
      })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(res =>{
        this.users = _.reject(this.users, ["id", id]);
      })
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
