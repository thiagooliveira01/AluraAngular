import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NotFoundComponent,
    GlobalErrorComponent
  ],
  providers:[{
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
  }],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ErrorsModule { }
