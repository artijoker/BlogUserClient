import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {Router} from "@angular/router";
import {ILogInResponse} from "../../../responses/authentication/ILogInResponse";
import {PostService} from "../../../services/post/post.service";
import {CategoryModelV1} from "../../../models/CategoryModelV1";
import {CategoryService} from "../../../services/category/category.service";

@Component({
  selector: 'app-add-post-page',
  templateUrl: './add-post-page.component.html',
  styleUrls: ['./add-post-page.component.css']
})
export class AddPostPageComponent implements OnInit {


    title: string = "";
    anons: string = "";
    htmlContent: string = "";
    categories : CategoryModelV1[] = [];
    selectedCategory?: CategoryModelV1;

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        sanitize: false,
        height: "20rem",
        minHeight: "5rem",
        placeholder: "Введите текст здесь...",
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
        toolbarHiddenButtons: [['insertImage', 'insertVideo', 'customClasses']]
    };


    constructor(private _router: Router,
                private _postService: PostService,
                private _categoryService: CategoryService) {
    }

    ngOnInit(): void {
        this._categoryService.getCategories()
            .subscribe(response => {
                if (response.succeeded) {
                    this.categories = response.result;
                }
                else {
                    alert(response.message);
                }
            })

    }


    onChange(category: CategoryModelV1) {
        this.selectedCategory = category;
    }

    isValid(){
        return this.title != "" && this.anons != "" && this.selectedCategory && this.htmlContent !== "";
    }

    showInvalidField(){
        if (this.title === "")
            alert("Пустой заголовок");
        else if(this.anons === "")
            alert("Пустой анонс");
        else if(!this.selectedCategory)
            alert("Выберите категорию");
        else if(this.htmlContent === "")
            alert("Пустой текст статьи");
    }

    saveAsDraft(){
        if (this.isValid()) {
            this._postService.addNewPost(this.title, this.anons, this.htmlContent, this.selectedCategory!.id)
                .subscribe(response=> {
                    if (response.succeeded) {
                        alert("Статья сохранена в черновиках");
                        this._router.navigate(
                            ['/home']
                        );
                    }
                    else {
                        alert(response.message);
                    }
                });
        }
        else{
            this.showInvalidField()
        }
    }

    saveAndSendToModeration(){
        if (this.isValid()) {
            this._postService.addNewPostAndSendToModeration(this.title,
                this.anons, this.htmlContent, this.selectedCategory!.id)
                .subscribe(response=> {
                    if (response.succeeded) {
                        alert("Статья сохранена и отправлена на модерацию");
                        this._router.navigate(
                            ['/home']
                        );
                    }
                    else {
                        alert(response.message);
                    }
                });
        }
        else{
            this.showInvalidField()
        }
    }

}
