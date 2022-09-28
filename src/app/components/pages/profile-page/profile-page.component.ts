import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../services/account/account.service";
import {AccountModelV2} from "../../../models/AccountModelV2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

    accountMode?: AccountModelV2;
    constructor(private _router: Router, private _accountService: AccountService) { }

  ngOnInit(): void {
      this._accountService.getAccount().subscribe(response => {
          this.accountMode = response.result;
      })
  }

  editAccount(){
      this._router.navigate(
          ['/edit-account']
      );
  }
}
