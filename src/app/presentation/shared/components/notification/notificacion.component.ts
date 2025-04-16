import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from './notificacion.service';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container">
      <div
        *ngFor="let notification of notifications"
        [ngClass]="{
          success: notification.type === 'success',
          error: notification.type === 'error',
        }"
        class="notification"
      >
        {{ notification.message }}
      </div>
    </div>
  `,
  styles: [
    `
      .notification-container {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 1000;
      }
      .notification {
        padding: 10px 20px;
        margin-bottom: 10px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      }
      .success {
        background-color: rgb(110, 201, 113);
      }
      .error {
        background-color: rgb(224, 135, 129);
      }
    `,
  ],
})
export class NotificacionComponent implements OnInit {
  notifications: { message: string; type: 'success' | 'error' }[] = [];

  constructor(private notificationService: NotificacionService) {}

  ngOnInit(): void {
    this.notificationService
      .getNotifications()
      .subscribe(
        (notification: { message: string; type: 'success' | 'error' }) => {
          this.notifications.push(notification);
          setTimeout(() => {
            this.notifications.shift();
          }, 3000); // Remove notification after 3 seconds
        }
      );
  }
}
