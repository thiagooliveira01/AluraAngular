import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Photo } from '../photo/photo';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();

  constructor(private activateRoute: ActivatedRoute) { }
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  ngOnInit(): void {
    this.photos = this.activateRoute.snapshot.data['photos'];
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.filter = filter);
  }

  onKeyUp(e: Event) {
    const elemento = <HTMLInputElement>e.target;
    this.debounce.next(elemento.value);
  }

}
