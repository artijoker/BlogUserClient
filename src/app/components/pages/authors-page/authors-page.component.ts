import { Component, OnInit } from '@angular/core';

import { AccountService } from 'src/app/services/account/account.service';
import {AccountModelV2} from "../../../models/AccountModelV2";
import {AccountModelV1} from "../../../models/AccountModelV1";

@Component({
  selector: 'app-authors-page',
  templateUrl: './authors-page.component.html',
  styleUrls: ['./authors-page.component.css']
})
export class AuthorsPageComponent implements OnInit {

  accountModels: AccountModelV2[] = [];

  constructor(private _accountService: AccountService) { }

  ngOnInit(): void {
    this._accountService.getAuthorsAndQuantityPostsEachHas()
      .subscribe(response => {
        if (response.succeeded) {
          this.accountModels = response.result;
            this.accountModels.sort(
                (a, b) => {
                    if (a.quantityPosts < b.quantityPosts)
                        return 1;
                    if (a.quantityPosts > b.quantityPosts)
                        return -1;
                    return 0;
                })
        }
        else {
          alert(response.message);
        }
      });
  }

}
