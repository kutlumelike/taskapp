import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-bell.component.html',
  styleUrl: './notification-bell.component.css'
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  showNotifications: boolean = false;
  private notifInterval: any;

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private eRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.showNotifications) {
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.showNotifications = false;
      }
    }
  }

  get unreadNotificationsCount(): number {
    return this.notifications.filter(n => !n.is_read).length;
  }

  ngOnInit(): void {
    this.loadNotifications();
    this.notifInterval = setInterval(() => {
      this.loadNotifications();
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.notifInterval) {
      clearInterval(this.notifInterval);
    }
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => {
        const seen = new Set<number>();
        const unique = data.filter(n => {
          if (seen.has(n.id)) return false;
          seen.add(n.id);
          return true;
        });
        this.notifications = unique;
      },
      error: () => {}
    });
  }

  toggleNotifications(event?: Event): void {
    if (event) event.stopPropagation();
    this.showNotifications = !this.showNotifications;
  }

  markNotifAsRead(notif: Notification, event: Event): void {
    event.stopPropagation();
    if (!notif.is_read) {
      this.notificationService.markAsRead(notif.id).subscribe({
        next: () => {
          notif.is_read = true;
          this.navigateToWorkspace(notif.workspace_id);
        },
        error: () => {}
      });
    } else {
      this.navigateToWorkspace(notif.workspace_id);
    }
  }

  markAllNotifsAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.notifications.forEach(n => n.is_read = true);
      },
      error: () => {}
    });
  }

  navigateToWorkspace(workspaceId?: number): void {
    if (workspaceId) {
      this.showNotifications = false;
      this.router.navigate(['/workspaces', workspaceId]);
    }
  }
}
