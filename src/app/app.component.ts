import { Component } from '@angular/core';
import { NotificationService } from './shared/services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private snackBar: MatSnackBar, private notificationService: NotificationService) {
    this.notificationService.notification$.subscribe(snack => {
      this.snackBar.open(
        snack.msg,
        "",
        { panelClass: snack.type, duration: 3000 });
    });
  }
}
