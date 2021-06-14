import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    @Output() onTyping = new EventEmitter<string>();
    @Input() value: string = '';
    debounce: Subject<string> = new Subject<string>();

    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }

    ngOnInit(): void {
        this.debounce
            .pipe(debounceTime(300))
            .subscribe(filter => this.onTyping.emit(filter));
    }

    onKeyUp(e: Event) {
        const elemento = <HTMLInputElement>e.target;
        this.debounce.next(elemento.value);
    }

}
