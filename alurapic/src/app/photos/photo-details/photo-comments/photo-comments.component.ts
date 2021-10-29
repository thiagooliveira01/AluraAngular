import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { PhotoComment } from "../../photo/photo-comment";
import { Input } from "@angular/core";
import { PhotoService } from "../../photo/photo.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number = 0;
    commentForm: FormGroup = new FormGroup({
        comment: new FormControl('', Validators.maxLength(300))
    });

    comments$!: Observable<PhotoComment[]>;
    
    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
    }

    save(){
        const comment = this.commentForm.get('comment')?.value as string;
        this.photoService
        .addComment(this.photoId, comment)
        .subscribe(() => {
            this.commentForm.reset();
        });
    }
}