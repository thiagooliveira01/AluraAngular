import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Input } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { switchMap, tap } from "rxjs/operators";
import { PhotoService } from "../../photo/photo.service";
import { PhotoComment } from "../../photo/photo-comment";

@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.css']
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
        this.comments$ = this.photoService
        .addComment(this.photoId, comment)
        .pipe(switchMap(() => this.comments$ = this.photoService.getComments(this.photoId)))
        .pipe(tap(() => {
            this.commentForm.reset();
            alert('Comentário adicionado com sucesso.');
        }));
    }
}