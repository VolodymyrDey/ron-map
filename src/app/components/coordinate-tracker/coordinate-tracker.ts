import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coordinate-tracker',
  imports: [CommonModule],
  templateUrl: './coordinate-tracker.html',
  styleUrl: './coordinate-tracker.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinateTrackerComponent {
  @Input() currentCoords: { x: number; y: number } | null = null;
  @Input() showCoords: boolean = false;
}
