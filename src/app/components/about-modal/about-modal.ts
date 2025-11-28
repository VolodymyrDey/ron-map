import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-modal',
  imports: [CommonModule],
  templateUrl: './about-modal.html',
  styleUrl: './about-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutModalComponent {
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
