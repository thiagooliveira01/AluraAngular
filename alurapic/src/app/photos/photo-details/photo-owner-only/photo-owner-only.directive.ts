import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { Photo } from "../../photo/photo";
import { Input } from "@angular/core";
import { UserService } from "../../../core/user/user.service";

@Directive({
    selector :'[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

    @Input() ownedPhoto!: Photo;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer2,
        private UserService: UserService
    ) {}

    ngOnInit() {
        this.UserService
            .getUser()
            .subscribe(user => {
                 if(!user || user.id != this.ownedPhoto.userId) 
                    this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
                }
            );
    }
}