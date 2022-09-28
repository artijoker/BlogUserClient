import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModelV1 } from 'src/app/models/CategoryModelV1';
import { PostService } from 'src/app/services/post/post.service';
import { DataService } from 'src/app/services/data/data.service';
import { CategoryService } from 'src/app/services/category/category.service';
import {CategoryModelV2} from "../../../models/CategoryModelV2";

@Component({
	selector: 'app-categories-page',
	templateUrl: './categories-page.component.html',
	styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

	categories: CategoryModelV2[] = [];



	constructor(
		private _router: Router,
		private _categoryService: CategoryService,
		private _postService: PostService,
		private _dataService: DataService) {
	}

	ngOnInit(): void {
		this.getCategories();
	}

	getCategories() {
        this._categoryService.getCategoriesAndCountByPostsForEachCategory()
            .subscribe(response => {
                console.dir(response);
                if (response.succeeded) {
                    this.categories = response.result;
                }
                else {
                    alert(response.message);
                }
            })
    }


	goToPostsByCategory(category: CategoryModelV1) {
		this._postService.getPublishedPostsByCategoryId(category.id)
			.subscribe(response => {
				console.dir(response);
				if (response.succeeded) {
					this._dataService.sendOutPosts(response.result)
				}
				else {
					alert(response.message);
					this._router.navigate(
						['/home']
					);
				}

			});
		this._router.navigate(
			['/posts']
		);
	}

}
