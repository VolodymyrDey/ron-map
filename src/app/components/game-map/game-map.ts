import { Component, OnInit, ViewChild, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMapService, GameMapConfig, GameMarker } from '../../services/game-map';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-game-map',
  imports: [CommonModule],
  templateUrl: './game-map.html',
  styleUrl: './game-map.css',
})
export class GameMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  currentMap: GameMapConfig | null = null;
  markers: GameMarker[] = [];
  selectedMarker: GameMarker | null = null;
  availableMaps: GameMapConfig[] = [];
  showMarkerForm = false;
  newMarkerX = 0;
  newMarkerY = 0;
  zoomLevel = 1;
  minZoom = 0.5;
  maxZoom = 3;
  zoomStep = 0.1;

  // Pan/Drag properties
  isPanning = false;
  panStartX = 0;
  panStartY = 0;
  panOffsetX = 0;
  panOffsetY = 0;
  lastPanOffsetX = 0;
  lastPanOffsetY = 0;

  private destroy$ = new Subject<void>();

  constructor(private gameMapService: GameMapService) { }

  ngOnInit(): void {
    this.availableMaps = this.gameMapService.getAvailableMaps();

    this.gameMapService.currentMap$
      .pipe(takeUntil(this.destroy$))
      .subscribe(map => {
        this.currentMap = map;
      });

    this.gameMapService.markers$
      .pipe(takeUntil(this.destroy$))
      .subscribe(markers => {
        this.markers = markers;
      });

    if (this.availableMaps.length > 0) {
      this.loadMap(this.availableMaps[0].id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMap(mapId: string): void {
    this.gameMapService.loadMap(mapId);
    this.selectedMarker = null;
  }

  onMapClick(event: MouseEvent): void {
    const rect = (event.target as HTMLImageElement).getBoundingClientRect();
    this.newMarkerX = Math.round(event.clientX - rect.left);
    this.newMarkerY = Math.round(event.clientY - rect.top);
    this.showMarkerForm = true;
  }

  selectMarker(marker: GameMarker, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedMarker = marker;
  }


  getMarkerStyle(marker: GameMarker): any {
    return {
      left: marker.x + 'px',
      top: marker.y + 'px'
    };
  }

  getMarkerClass(marker: GameMarker): any {
    return {
      'marker': true,
      'marker-spawn': marker.type === 'spawn',
      'marker-resource': marker.type === 'resource',
      'marker-wonder': marker.type === 'wonder',
      'marker-unit': marker.type === 'unit',
      'marker-selected': this.selectedMarker?.id === marker.id
    };
  }

  closeMarkerForm(): void {
    this.showMarkerForm = false;
  }

  zoomIn(): void {
    if (this.zoomLevel < this.maxZoom) {
      this.zoomLevel = Math.min(this.maxZoom, this.zoomLevel + this.zoomStep);
    }
  }

  zoomOut(): void {
    if (this.zoomLevel > this.minZoom) {
      this.zoomLevel = Math.max(this.minZoom, this.zoomLevel - this.zoomStep);
    }
  }

  onMouseWheel(event: WheelEvent): void {
    event.preventDefault();

    if (event.deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
  }

  // Mouse events for panning
  onMouseDown(event: MouseEvent): void {
    if (event.button === 0 && !this.showMarkerForm) { // Left mouse button and not in marker mode
      this.isPanning = true;
      this.panStartX = event.clientX - this.panOffsetX;
      this.panStartY = event.clientY - this.panOffsetY;
      event.preventDefault();
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isPanning) {
      this.panOffsetX = event.clientX - this.panStartX;
      this.panOffsetY = event.clientY - this.panStartY;
      event.preventDefault();
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    if (this.isPanning) {
      this.isPanning = false;
      this.lastPanOffsetX = this.panOffsetX;
      this.lastPanOffsetY = this.panOffsetY;
    }
  }

  resetZoom(): void {
    this.zoomLevel = 1.0;
    this.panOffsetX = 0;
    this.panOffsetY = 0;
    this.lastPanOffsetX = 0;
    this.lastPanOffsetY = 0;
  }

  getMapStyle() {
    return {
      transform: `scale(${this.zoomLevel}) translate(${this.panOffsetX}px, ${this.panOffsetY}px)`,
      'transform-origin': 'center center',
      transition: this.isPanning ? 'none' : 'transform 0.3s ease'
    };
  }

  getZoomPercentage(): number {
    return Math.round(this.zoomLevel * 100);
  }
}
