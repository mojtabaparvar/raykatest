import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
export interface SnackModel {
  msg: string,
  type: string
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notification$: Subject<SnackModel> = new Subject();

  constructor() { }
}
