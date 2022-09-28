import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {DataService} from 'src/app/services/data/data.service';
import {PostService} from 'src/app/services/post/post.service';
import {AccountModelV2} from "../../models/AccountModelV2";

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

    @Input() accountModel?: AccountModelV2

    constructor(
        private _router: Router,
        private _postService: PostService,
        private _dataService: DataService) {
    }

    ngOnInit(): void {
    }

    goToPostsByAuthorId(id: number) {
        this._postService.getPublishedPostsByAccountId(id)
            .subscribe(response => {
                if (response.succeeded) {
                    this._dataService.sendOutPosts(response.result)
                } else {
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
