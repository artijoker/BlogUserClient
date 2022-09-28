import {Component, OnInit} from '@angular/core';
import {PostModel} from "../../../models/PostModel";
import {PostService} from "../../../services/post/post.service";
import {Router} from "@angular/router";
import {CategoryModelV1} from "../../../models/CategoryModelV1";
import {CategoryService} from "../../../services/category/category.service";
import {DataService} from "../../../services/data/data.service";

@Component({
    selector: 'app-home',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

    posts: PostModel[] = [];

    constructor(private _router: Router,
                private _categoryService: CategoryService,
                private _postService: PostService,
                private _dataService: DataService) {
    }

    ngOnInit(): void {
        this._postService.getSpecificRecentNumberPosts(4)
            .subscribe(response => {
                console.dir(response);
                this.posts = response.result;
            })
    }

    goToPost(postId: number){
        this._router.navigate(
            [this._router.url + '/post', postId]
        );
    }

    goToPostsByCategory(categoryId: number) {
        this._postService.getPublishedPostsByCategoryId(categoryId)
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
