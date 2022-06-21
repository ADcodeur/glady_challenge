import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handleHttpError(error: HttpErrorResponse) {
    alert(error.message);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
