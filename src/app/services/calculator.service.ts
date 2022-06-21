import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  SearchCombinaisonCommand,
  SearchCombinaisonResult,
} from '../model/interfaces';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  calculatorApiRootUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  searchCombinaison(
    command: SearchCombinaisonCommand
  ): Observable<SearchCombinaisonResult> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('amount', command.amount);

    return this.httpClient
      .get<SearchCombinaisonResult>(
        `${this.calculatorApiRootUrl}/shop/${command.shopId}/search-combination`,
        { observe: 'body', responseType: 'json', params: queryParams }
      )
      .pipe(catchError(this.errorHandlerService.handleHttpError));
  }
}
