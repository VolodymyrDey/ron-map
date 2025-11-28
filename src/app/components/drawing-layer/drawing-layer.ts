import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingLine } from '../map-viewer/map-viewer';
import { DrawingPathPipe } from '../../pipes/drawing-path.pipe';

@Component({
  selector: 'app-drawing-layer',
  imports: [CommonModule, DrawingPathPipe],
  templateUrl: './drawing-layer.html',
  styleUrl: './drawing-layer.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawingLayerComponent {
  @Input() drawnLines: DrawingLine[] = [];
  @Input() isDrawing: boolean = false;
  @Input() isDrawingMode: boolean = false;
  @Input() isEraserMode: boolean = false;
  @Input() drawingPath: { x: number; y: number }[] = [];
  @Input() selectedDrawColor: string = '#FF0000';
}
