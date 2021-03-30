import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, forkJoin, of, Subject } from 'rxjs';
import { catchError, concatMap, map, mergeMap, skipWhile, switchMap, takeUntil } from 'rxjs/operators';
import { slideInAnimation } from 'src/app/shared/animations/animations';
import { HomeService, NumbersModel, OPERATIONS_ENUM } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: slideInAnimation
})
export class HomeComponent implements OnInit, OnDestroy {
  protected _onDestroy = new Subject<void>();
  numbers: NumbersModel[] = [];
  staggeringNumbers: NumbersModel[] = [];
  nextCardAnimation: number = 0;
  constructor(private homeService: HomeService) { }
  ngOnInit(): void {
    this._getData();
  }
  private _getData() {
    this.homeService
      .getNumbersJson()
      .pipe(
        takeUntil(
          this._onDestroy
        ),
        skipWhile(val => !val),
        switchMap(
          numbers => this.homeService.
            getMultiplyJson()
            .pipe(
              takeUntil(
                this._onDestroy
              ),
              map(multiplyData => {
                return {
                  numbers, multiplyData
                };

              }),
              catchError(_ => of(
                {
                  numbers,
                  multiplyData: null
                })
              )
            )
        ),
        switchMap(initData => {
          return this.homeService.getAdditionJson().pipe(
            takeUntil(this._onDestroy),
            map(addData => {
              return {
                addData, ...initData
              };
            }),

            catchError(_ => of(
              {
                addData: null,
                ...initData
              })
            )
          );
        })
      )
      .subscribe({
        next: finalData => {
          this.numbers = [...finalData.numbers];
          this.numbers.forEach(_number => {
            _number.name = "Unknown";
            if (finalData.multiplyData) {
              if (_number.action === OPERATIONS_ENUM.MULTIPLY) {
                _number.name = "Multiply";
                _number.finalResponse = `${_number.value} * ${finalData.multiplyData.value} = ${_number.value * finalData.multiplyData.value}`;
              }
            }
            if (finalData.addData) {
              if (_number.action === OPERATIONS_ENUM.ADD) {
                _number.name = "Add";
                _number.finalResponse = `${_number.value} + ${finalData.addData.value} = ${_number.value + finalData.addData.value}`;
              }
            }

          });
          this.doNextAnimation();

        }
      }
      );
  }

  doNextAnimation() {
    if (this.nextCardAnimation < this.numbers.length) {
      this.staggeringNumbers.push(this.numbers[this.nextCardAnimation++]);
    }
  }
  cardClicked(clickedNumber: NumbersModel) {
    console.log(clickedNumber, "this is the clicked number");
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
