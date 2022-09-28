import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountModelV2} from '../../models/AccountModelV2'

import {IResponse} from '../../responses/IResponse';
import {AccountModelV1} from "../../models/AccountModelV1";

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) { }

    private getHttpHeaders(){
        let token = localStorage.getItem("token");
        return new HttpHeaders().set("Authorization", "Bearer " + token);

    }

    getAuthorsAndQuantityPostsEachHas(): Observable<IResponse<AccountModelV2[]>> {
        return this._client.get<IResponse<AccountModelV2[]>>(this._host + "account/get-accounts-and-quantity-published-posts");
    }

    getAccount(): Observable<IResponse<AccountModelV2>> {
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this._client.get<IResponse<AccountModelV2>>(this._host + "account/get-account",
        {headers:headers});
    }

    updateAccount(email: string, login: string,  newPassword: string): Observable<IResponse> {
        let body = {
            email: email,
            login: login,
            newPassword: newPassword
        }
        let token = localStorage.getItem("token");
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
            .set("content-type", "application/json");

        return this._client.post<IResponse>(
            this._host + "account/edit-account", body,{headers:headers}
        );
    }

    deleteAccount(): Observable<IResponse> {
        return this._client.get<IResponse>(this._host + "account/delete-account",
            {headers:this.getHttpHeaders()});
    }
}
