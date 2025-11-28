import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMapConfig, GameMarker } from '../../services/game-map';
import { getMarkerConfig, getMarkerTypes } from '../../config/marker-types.config';

export interface DrawingLine {
  id: string;
  path: { x: number; y: number }[];
  color: string;
  layerId: string;
  mapId: string;
  type: 'freehand' | 'line' | 'rectangle' | 'circle';
  timestamp: number;
}

export interface LegendItem {
  id: string;
  color: string;
  label: string;
  visible: boolean;
}

@Component({
  selector: 'app-map-viewer',
  imports: [CommonModule],
  templateUrl: './map-viewer.html',
  styleUrl: './map-viewer.css',
})
export class MapViewerComponent {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  @Input() currentMap: GameMapConfig | null = null;
  @Input() zoomLevel: number = 1;
  @Input() baseScale: number = 1;
  @Input() panOffsetX: number = 0;
  @Input() panOffsetY: number = 0;
  @Input() markers: GameMarker[] = [];
  @Input() drawnLines: DrawingLine[] = [];
  @Input() isDrawingMode: boolean = false;
  @Input() isEraserMode: boolean = false;
  @Input() selectedMarker: GameMarker | null = null;
  @Input() selectedDrawColor: string = '#FF0000';
  @Input() legendItems: LegendItem[] = [];
  @Input() isPanning: boolean = false;
  @Input() isDrawing: boolean = false;
  @Input() drawingPath: { x: number; y: number }[] = [];
  @Input() isLoading: boolean = false;

  @Output() mapClick = new EventEmitter<{ x: number; y: number }>();
  @Output() markerClick = new EventEmitter<GameMarker>();
  @Output() mouseWheel = new EventEmitter<WheelEvent>();
  @Output() mouseDown = new EventEmitter<MouseEvent>();
  @Output() mouseMove = new EventEmitter<MouseEvent>();
  @Output() mouseUp = new EventEmitter<MouseEvent>();
  @Output() layerSelected = new EventEmitter<string>();

  // Coordinate tracking
  currentCoords: { x: number; y: number } | null = null;
  showCoords: boolean = false;
  // Hover tracking for markers to show tooltip on hover for specific types
  hoveredMarkerId: string | null = null;

  getMapStyle(): any {
    const effectiveScale = (this.baseScale || 1) * (this.zoomLevel || 1);
    return {
      transform: `scale(${effectiveScale}) translate(${this.panOffsetX / effectiveScale}px, ${this.panOffsetY / effectiveScale}px)`,
      'transform-origin': 'center center',
      transition: this.isPanning || this.isDrawing ? 'none' : 'transform 0.1s ease-out',
      'will-change': this.isPanning || this.isDrawing ? 'transform' : 'auto'
    };
  }

  getMarkerStyle(marker: GameMarker): any {
    // With image-wrapper as inline-block, the wrapper matches the image dimensions exactly
    // So percentage positioning works correctly across all aspect ratios
    return {
      left: marker.x + '%',
      top: marker.y + '%'
    };
  }

  getMarkerClass(marker: GameMarker): any {
    return {
      'marker': true,
      'marker-spawn': marker.type === 'spawn',
      'marker-hard-objective': marker.type === 'hard_objective',
      'marker-soft-objective': marker.type === 'soft_objective',
      'marker-stairs-down': marker.type === 'stairs_down',
      'marker-stairs-up': marker.type === 'stairs_up',
      'marker-comms': marker.type === 'comms',
      'marker-selected': this.selectedMarker?.id === marker.id
    };
  }

  getMarkerIcon(marker: GameMarker): string {
    const config = getMarkerConfig(marker.type);
    return config.icon;
  }

  /** Return the svg URL to use for this marker, preferring an explicit
   * per-marker svgIconUrl, then the marker type's configured svgIconUrl.
   */
  getMarkerSvgUrl(marker: GameMarker): string | undefined {
    if (marker.svgIconUrl) return marker.svgIconUrl;
    const config = getMarkerConfig(marker.type) as any;
    return config?.svgIconUrl;
  }

  getMarkerColor(marker: GameMarker): string {
    // Use custom color if provided, otherwise use config color
    if (marker.color) {
      return marker.color;
    }
    const config = getMarkerConfig(marker.type);
    return config.color;
  }

  getMarkerIconColor(marker: GameMarker): string {
    const config = getMarkerConfig(marker.type);
    return config.iconColor;
  }

  getVisibleMarkers(): GameMarker[] {
    if (!this.currentMap) return [];
    
    const visibleLayerIds = new Set(
      this.currentMap.layers?.filter(l => l.visible).map(l => l.id) || []
    );
    const visibleLegendTypes = new Set(
      this.legendItems.filter(item => item.visible).map(item => item.id)
    );
    
    return this.markers.filter(marker => {
      const layerVisible = !marker.layerId || visibleLayerIds.has(marker.layerId);
      const typeVisible = visibleLegendTypes.has(marker.type);
      return layerVisible && typeVisible;
    });
  }

  getDrawingPathString(path: { x: number; y: number }[]): string {
    if (path.length === 0) return '';
    return path.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');
  }

  getCursor(): string {
    if (this.isPanning) return 'grabbing';
    if (this.isDrawingMode) {
      return this.isEraserMode ? 'not-allowed' : 'crosshair';
    }
    return 'grab';
  }

  onMapClick(event: MouseEvent): void {
    // Find the actual image element and compute percent coords relative to it
    const current = event.currentTarget as HTMLElement | null;
    let img: HTMLImageElement | null = null;

    if (current) img = current.querySelector('.layer-image');
    if (!img) {
      const target = event.target as HTMLElement | null;
      img = target?.closest('.image-wrapper')?.querySelector('.layer-image') || null;
    }
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    const percentX = (clickX / rect.width) * 100;
    const percentY = (clickY / rect.height) * 100;

    this.mapClick.emit({ x: Math.round(percentX * 100) / 100, y: Math.round(percentY * 100) / 100 });
  }

  /**
   * Click handler attached to individual layer images. Computes percentage
   * coordinates relative to the clicked image, prompts the user to pick a
   * marker type, and prints the marker JSON (including layerId) to the
   * browser console.
   */
  onMapImageClick(event: Event, layerId: string): void {
    // Debug: log click entry so we can trace whether the click fired
    // console.debug('[MapViewer] onMapImageClick fired', { eventType: event.type, layerId });
    event.stopPropagation();

    // find the actual image element clicked
    const target = (event as any).target as HTMLElement | null;
    const img = target?.closest('.image-wrapper')?.querySelector('.layer-image') as HTMLImageElement | null;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    let clickX: number, clickY: number;

    if (event instanceof MouseEvent) {
      clickX = event.clientX - rect.left;
      clickY = event.clientY - rect.top;
    } else {
      // Keyboard activation: use center of image
      clickX = rect.width / 2;
      clickY = rect.height / 2;
    }
    const percentX = (clickX / rect.width) * 100;
    const percentY = (clickY / rect.height) * 100;

    const x = Math.round(percentX * 100) / 100;
    const y = Math.round(percentY * 100) / 100;

    // Prompt for marker type using available types
    const types = getMarkerTypes();
    const promptText = 'Select marker type (one of):\n' + types.join(', ');
    const defaultType = types[0] || 'spawn';
  const chosen = (globalThis as any).prompt(promptText, defaultType);
    if (!chosen) {
      console.log('Marker creation cancelled');
      return;
    }
    const type = chosen.trim();
    if (!types.includes(type)) {
      console.warn('Invalid marker type selected:', type);
      return;
    }

    // Prompt for optional title
    const titlePrompt = 'Enter marker title (optional):';
    const titleInput = (globalThis as any).prompt(titlePrompt, '');
    const title = titleInput ? titleInput.trim() : '';

    const markerJson = {
      id: `new-${Date.now()}`,
      x,
      y,
      title,
      description: '',
      type,
      layerId
    };

    console.log('Marker JSON:', JSON.stringify(markerJson, null, 2));
  }

  onMapImagePointerDown(event: PointerEvent): void {
    // Debug: log pointerdown so we can confirm pointer events are received
    // console.debug('[MapViewer] onMapImagePointerDown', { eventType: event.type, pointerType: (event as any).pointerType });
    // Stop propagation so parent panning handlers don't start. We avoid
    // preventDefault() to allow the subsequent click event to fire.
    event.stopPropagation();
  }

  onMapImageMouseDown(event: MouseEvent | TouchEvent): void {
    // Called on mousedown/touchstart to ensure parent handlers don't
    // initiate panning. We only stop propagation here; do not call
    // preventDefault() so that the overlay's click event still fires.
    // console.debug('[MapViewer] onMapImageMouseDown', { type: (event as any).type });
    (event as Event).stopPropagation();
  }

  selectMarker(marker: GameMarker, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.markerClick.emit(marker);
  }

  /** Click wrapper to prevent selection for non-interactive types (stairs). */
  onMarkerClick(marker: GameMarker, event: Event): void {
    if (marker.type === 'stairs_down' || marker.type === 'stairs_up' || marker.type === 'comms') {
      event.stopPropagation();
  event.preventDefault();
      return;
    }
    // For keyboard events, we still want to call selectMarker with an object
    // that matches MouseEvent signature for downstream handlers; pass a dummy
    // MouseEvent when needed.
    if ((event as KeyboardEvent).key) {
      const fakeMouse = new MouseEvent('click');
      this.selectMarker(marker, fakeMouse);
    } else {
      this.selectMarker(marker, event as unknown as MouseEvent);
    }
  }

  onMarkerHover(marker: GameMarker): void {
    if (marker.type === 'stairs_down' || marker.type === 'stairs_up' || marker.type === 'comms') {
      this.hoveredMarkerId = marker.id;
    }
  }

  onMarkerHoverLeave(): void {
    this.hoveredMarkerId = null;
  }

  shouldShowTooltip(marker: GameMarker): boolean {
    // Show tooltip if selected, or if hovering on a stairs marker
    if (this.selectedMarker?.id === marker.id) return true;
    if ((marker.type === 'stairs_down' || marker.type === 'stairs_up' || marker.type === 'comms') && this.hoveredMarkerId === marker.id) return true;
    return false;
  }

  onMouseDown(event: MouseEvent): void {
    // console.debug('[MapViewer] onMouseDown emitted', { type: event.type, button: event.button, clientX: event.clientX, clientY: event.clientY });
    this.mouseDown.emit(event);
  }

  onMouseWheel(event: WheelEvent): void {
    this.mouseWheel.emit(event);
  }

  selectLayer(layerId: string): void {
    this.layerSelected.emit(layerId);
  }

  onMapMouseMove(event: MouseEvent): void {
    // Get the actual image element to calculate coordinates relative to it
    const target = event.currentTarget as HTMLElement;
    const imgElement = target.querySelector('.layer-image') as HTMLImageElement;
    
    if (!imgElement) {
      this.showCoords = false;
      return;
    }
    
    const rect = imgElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Check if mouse is within the image bounds
    if (mouseX < 0 || mouseX > rect.width || mouseY < 0 || mouseY > rect.height) {
      this.showCoords = false;
      this.currentCoords = null;
      return;
    }
    
    // Convert to percentage coordinates
    const percentX = (mouseX / rect.width) * 100;
    const percentY = (mouseY / rect.height) * 100;
    
    this.currentCoords = {
      x: Math.round(percentX * 100) / 100, // Round to 2 decimal places
      y: Math.round(percentY * 100) / 100
    };
    this.showCoords = true;
  }

  onMapMouseLeave(): void {
    this.showCoords = false;
    this.currentCoords = null;
  }
}
