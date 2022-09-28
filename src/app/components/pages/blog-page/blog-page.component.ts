import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';
import { PostService } from 'src/app/services/post/post.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { CategoryModelV1 } from 'src/app/models/CategoryModelV1';
@Component({
    selector: 'app-blog',
    templateUrl: './blog-page.component.html',
    styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

    categories: CategoryModelV1[] = [];

    constructor(private _postService: PostService,
        private _categoryService: CategoryService,
        private _dataService: DataService) { }

    ngOnInit(): void {
        this.getCategories();
        this.getAllPosts();

    }

    getCategories() {
        this._categoryService.getCategories()
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

    getAllPosts() {
        this._postService.getPublishedPosts()
            .subscribe(response => {
                if (response.succeeded) {
                    this._dataService.sendOutPosts(response.result)
                }
                else {
                    alert(response.message);
                }
            });
    }

    getPostsByCategory(category: CategoryModelV1) {
        this._postService.getPublishedPostsByCategoryId(category.id)
            .subscribe(response => {
                if (response.succeeded) {
                    this._dataService.sendOutPosts(response.result)
                }
                else {
                    alert(response.message);
                }
            });
    }
}


