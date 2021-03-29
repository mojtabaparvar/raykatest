import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { environment } from 'src/environments/environment';
import { EMPTY } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
export enum OPERATIONS_ENUM {
  ADD = "add",
  MULTIPLY = "multiply"
}
export enum JSONS_ENUM {
  ADD = "add",
  MULTIPLY = "multiply",
  NUMBERS = "numbers",
}

export interface AddNMultiplyModel {
  value: number;
}
export interface NumbersModel {
  value: number;
  action: string;
  finalResponse?: string;
  name?: string;
}
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }
  getArithemticOperationJsons(operationName: string) {
    return this.http.get(`${environment.API_URL}${operationName}.json`).pipe(
      map((res: unknown) => {
        return res;
      }
      ), finalize(() => {
        // HERE WE WILL STOP THE lOADING IF THERE IS ONE
      }));
  }
  getNumbersJson() {
    return this.getArithemticOperationJsons(JSONS_ENUM.NUMBERS).pipe(
      map(val => {
        return val as NumbersModel[];
      })
      , catchError((err) => {
        this.errorHandlerService.showErrorSnack();
        return this.errorHandlerService.handleHttpErrorReturn();
      }
      )
    )
  }
  getMultiplyJson() {
    return this.getArithemticOperationJsons(JSONS_ENUM.MULTIPLY).pipe(
      map(val => {
        return val as AddNMultiplyModel;
      }),
      catchError((err) => this.errorHandlerService.handleHttpErrorReturn())
    )
  }
  getAdditionJson() {
    return this.getArithemticOperationJsons(JSONS_ENUM.ADD).pipe(
      map(val => {
        return val as AddNMultiplyModel;
      })
      ,
      catchError((err) => this.errorHandlerService.handleHttpErrorReturn())
    )
  }
}
