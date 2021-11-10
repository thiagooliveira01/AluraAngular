import { Component, OnInit } from "@angular/core";
import { LoadingService } from "./loading.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: 'ap-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['loading.component.css']
})
export class LoadingComponent{

    loading: string = '';

    constructor(private loadingService: LoadingService) {
        this.loadingService
            .getLoading()
            .subscribe(loading => this.loading = loading);
    }
}