import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private notifService: NotificationService) { }
  showErrorSnack() {
    this.notifService.notification$.next({ msg: environment.ERROR_MSG, type: "notif-error" });
  }
  handleHttpErrorReturn() {
    return EMPTY;

  }
}
