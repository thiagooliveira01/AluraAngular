import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Photo } from "../photo/photo";
import { PhotoService } from "../photo/photo.service";
import { Observable } from "rxjs";
import { PhotoComment } from "../photo/photo-comment";

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit{ 

    router: ActivatedRoute;
    photo$!: Observable<Photo>;
    photoId: number = 0;

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService){
        this.router = route;
    }
    ngOnInit(): void {
        this.photoId = this.route.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(this.photoId);
    }
 }