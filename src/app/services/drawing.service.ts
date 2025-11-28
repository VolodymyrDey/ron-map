import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DrawingLine } from '../components/map-viewer/map-viewer';

export interface DrawingState {
  isDrawing: boolean;
  isDrawingMode: boolean;
  isEraserMode: boolean;
  drawingPath: { x: number; y: number }[];
  selectedDrawColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  private readonly STORAGE_KEY = 'ron-map-drawings';
  private readonly drawingsSubject = new BehaviorSubject<DrawingLine[]>([]);
  public drawings$ = this.drawingsSubject.asObservable();

  private readonly drawingStateSubject = new BehaviorSubject<DrawingState>({
    isDrawing: false,
    isDrawingMode: false,
    isEraserMode: false,
    drawingPath: [],
    selectedDrawColor: '#FF0000'
  });
  public drawingState$ = this.drawingStateSubject.asObservable();

  constructor() {
    this.loadDrawings();
  }

  // Drawing state management
  getDrawingState(): DrawingState {
    return this.drawingStateSubject.getValue();
  }

  setDrawingMode(enabled: boolean): void {
    const current = this.drawingStateSubject.getValue();
    this.drawingStateSubject.next({
      ...current,
      isDrawingMode: enabled,
      isDrawing: false,
      isEraserMode: enabled ? current.isEraserMode : false,
      drawingPath: []
    });
  }

  setEraserMode(enabled: boolean): void {
    const current = this.drawingStateSubject.getValue();
    this.drawingStateSubject.next({
      ...current,
      isEraserMode: enabled
    });
  }

  setDrawColor(color: string): void {
    const current = this.drawingStateSubject.getValue();
    this.drawingStateSubject.next({
      ...current,
      selectedDrawColor: color,
      isEraserMode: false
    });
  }

  /**
   * Calculate percentage coordinates relative to the displayed image
   * @param clientX Mouse X position in viewport
   * @param clientY Mouse Y position in viewport
   * @param rect Bounding rectangle of the map image
   * @returns Percentage coordinates {x, y} rounded to 2 decimal places
   */
  calculatePercentageCoords(
    clientX: number,
    clientY: number,
    rect: DOMRect
  ): { x: number; y: number } {
    const sx = ((clientX - rect.left) / rect.width) * 100;
    const sy = ((clientY - rect.top) / rect.height) * 100;
    return {
      x: Math.round(sx * 100) / 100,
      y: Math.round(sy * 100) / 100
    };
  }

  startDrawing(clientX: number, clientY: number, rect: DOMRect): void {
    const coords = this.calculatePercentageCoords(clientX, clientY, rect);
    const current = this.drawingStateSubject.getValue();
    this.drawingStateSubject.next({
      ...current,
      isDrawing: true,
      drawingPath: [coords]
    });
  }

  continueDrawing(clientX: number, clientY: number, rect: DOMRect): void {
    const current = this.drawingStateSubject.getValue();
    if (!current.isDrawing) return;

    const coords = this.calculatePercentageCoords(clientX, clientY, rect);
    this.drawingStateSubject.next({
      ...current,
      drawingPath: [...current.drawingPath, coords]
    });
  }

  finishDrawing(mapId: string, layerId: string): DrawingLine | null {
    const current = this.drawingStateSubject.getValue();
    
    if (!current.isDrawing || current.drawingPath.length < 2) {
      this.drawingStateSubject.next({
        ...current,
        isDrawing: false,
        drawingPath: []
      });
      return null;
    }

    let result: DrawingLine | null = null;

    if (current.isEraserMode) {
      // Erase drawings
      this.eraseDrawingsInArea(mapId, layerId, current.drawingPath, current.selectedDrawColor);
    } else {
      // Add new drawing
      const newDrawing: DrawingLine = {
        id: 'd' + Date.now(),
        path: [...current.drawingPath],
        color: current.selectedDrawColor,
        layerId: layerId,
        mapId: mapId,
        type: 'freehand',
        timestamp: Date.now()
      };
      this.addDrawing(newDrawing);
      result = newDrawing;
    }

    this.drawingStateSubject.next({
      ...current,
      isDrawing: false,
      drawingPath: []
    });

    return result;
  }

  cancelDrawing(): void {
    const current = this.drawingStateSubject.getValue();
    this.drawingStateSubject.next({
      ...current,
      isDrawing: false,
      drawingPath: []
    });
  }

  private loadDrawings(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const drawings = JSON.parse(stored) as DrawingLine[];
        this.drawingsSubject.next(drawings);
      }
    } catch (error) {
      console.error('Failed to load drawings:', error);
    }
  }

  private saveDrawings(): void {
    try {
      const drawings = this.drawingsSubject.getValue();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(drawings));
    } catch (error) {
      console.error('Failed to save drawings:', error);
    }
  }

  getDrawings(): DrawingLine[] {
    return this.drawingsSubject.getValue();
  }

  getDrawingsForMapAndLayer(mapId: string, layerId: string): DrawingLine[] {
    return this.drawingsSubject.getValue().filter(
      d => d.mapId === mapId && d.layerId === layerId
    );
  }

  addDrawing(drawing: DrawingLine): void {
    const drawings = this.drawingsSubject.getValue();
    const updated = [...drawings, drawing];
    this.drawingsSubject.next(updated);
    this.saveDrawings();
  }

  removeDrawing(drawingId: string): void {
    const drawings = this.drawingsSubject.getValue();
    const updated = drawings.filter(d => d.id !== drawingId);
    this.drawingsSubject.next(updated);
    this.saveDrawings();
  }

  clearDrawingsForMap(mapId: string): void {
    const drawings = this.drawingsSubject.getValue();
    const updated = drawings.filter(d => d.mapId !== mapId);
    this.drawingsSubject.next(updated);
    this.saveDrawings();
  }

  clearDrawingsForLayer(mapId: string, layerId: string): void {
    const drawings = this.drawingsSubject.getValue();
    const updated = drawings.filter(d => !(d.mapId === mapId && d.layerId === layerId));
    this.drawingsSubject.next(updated);
    this.saveDrawings();
  }

  clearAllDrawings(): void {
    this.drawingsSubject.next([]);
    this.saveDrawings();
  }

  eraseDrawingsInArea(mapId: string, layerId: string, eraserPath: { x: number; y: number }[], color?: string): void {
    if (eraserPath.length < 2) return;

    const drawings = this.drawingsSubject.getValue();
    const eraserRadius = 5; // Radius around eraser path to check for intersections

    const updated = drawings.filter(drawing => {
      // Only check drawings on the same map and layer
      if (drawing.mapId !== mapId || drawing.layerId !== layerId) {
        return true;
      }

      // If a color is provided, only consider drawings with that color;
      // otherwise, default to erasing any drawing intersecting the area.
      if (color && drawing.color !== color) {
        return true;
      }

      // Check if any point in the drawing path intersects with the eraser path
      for (const drawPoint of drawing.path) {
        for (const eraserPoint of eraserPath) {
          const distance = Math.sqrt(
            Math.pow(drawPoint.x - eraserPoint.x, 2) + 
            Math.pow(drawPoint.y - eraserPoint.y, 2)
          );

          // If the distance is within the eraser radius, remove this drawing
          if (distance < eraserRadius) {
            return false;
          }
        }
      }

      return true;
    });

    this.drawingsSubject.next(updated);
    this.saveDrawings();
  }
}
