import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private notificationSubject = new Subject<{
    message: string;
    type: 'success' | 'error';
  }>();

  sendNotification(message: string, type: 'success' | 'error'): void {
    this.notificationSubject.next({ message, type });
  }

  getNotifications(): Observable<{
    message: string;
    type: 'success' | 'error';
  }> {
    return this.notificationSubject.asObservable();
  }
}
