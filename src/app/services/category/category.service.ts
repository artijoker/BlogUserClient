import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryModelV1} from '../../models/CategoryModelV1';
import {IResponse} from '../../responses/IResponse';
import {CategoryModelV2} from "../../models/CategoryModelV2";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private _client: HttpClient,
                @Inject('HOST_URL') private _host: string) {
    }


    getCategories(): Observable<IResponse<CategoryModelV1[]>> {
        return this._client.get<IResponse<CategoryModelV1[]>>(this._host + "category/get-categories");
    }

    getCategoriesAndCountByPostsForEachCategory(): Observable<IResponse<CategoryModelV2[]>> {
        return this._client.get<IResponse<CategoryModelV2[]>>(
            this._host + "category/get-categories-and-count-published-posts"
        );
    }

}
