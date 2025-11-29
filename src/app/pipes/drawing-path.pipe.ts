import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pure pipe for converting drawing path array to SVG path string
 * This ensures the computation only happens when the input actually changes
 */
@Pipe({
  name: 'drawingPath',
  pure: true,
  standalone: true
})
export class DrawingPathPipe implements PipeTransform {
  transform(path: { x: number; y: number }[]): string {
    if (!path || path.length === 0) return '';
    
    return path
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');
  }
}
