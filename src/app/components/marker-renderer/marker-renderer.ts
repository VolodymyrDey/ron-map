import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMarker } from '../../services/game-map';
import { getMarkerConfig } from '../../config/marker-types.config';
import { LegendItem } from '../map-viewer/map-viewer';
import { ComputedCache } from '../../utils/memoize.util';

@Component({
  selector: 'app-marker-renderer',
  imports: [CommonModule],
  templateUrl: './marker-renderer.html',
  styleUrl: './marker-renderer.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkerRendererComponent {
  @Input() markers: GameMarker[] = [];
  @Input() currentMapLayers: any[] = [];
  @Input() legendItems: LegendItem[] = [];
  @Input() selectedMarker: GameMarker | null = null;

  @Output() markerClick = new EventEmitter<GameMarker>();

  hoveredMarkerId: string | null = null;

  // Memoized computation for visible markers
  private readonly visibleMarkersCache = new ComputedCache<GameMarker[]>(
    (markers: GameMarker[], layers: any[], legendItems: LegendItem[]) => {
      if (!layers || layers.length === 0) return [];
      
      const visibleLayerIds = new Set(
        layers.filter(l => l.visible).map(l => l.id)
      );
      const visibleLegendTypes = new Set(
        legendItems.filter(item => item.visible).map(item => item.id)
      );
      
      return markers.filter(marker => {
        const layerVisible = !marker.layerId || visibleLayerIds.has(marker.layerId);
        const typeVisible = visibleLegendTypes.has(marker.type);
        return layerVisible && typeVisible;
      });
    }
  );

  getMarkerStyle(marker: GameMarker): any {
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
      'marker-stairs-up-down': marker.type === 'stairs_up_down',
      'marker-comms': marker.type === 'comms',
      'marker-selected': this.selectedMarker?.id === marker.id
    };
  }

  getMarkerIcon(marker: GameMarker): string {
    const config = getMarkerConfig(marker.type);
    return config.icon;
  }

  getMarkerSvgUrl(marker: GameMarker): string | undefined {
    if (marker.svgIconUrl) return marker.svgIconUrl;
    const config = getMarkerConfig(marker.type) as any;
    return config?.svgIconUrl;
  }

  getMarkerColor(marker: GameMarker): string {
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
    // Use memoized cache to avoid recomputing on every change detection cycle
    return this.visibleMarkersCache.get(
      this.markers,
      this.currentMapLayers,
      this.legendItems
    );
  }

  onMarkerClick(marker: GameMarker, event: Event): void {
    if (marker.type === 'stairs_down' || 
        marker.type === 'stairs_up' || 
        marker.type === 'stairs_up_down' || 
        marker.type === 'comms') {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    
    if ((event as KeyboardEvent).key) {
      const fakeMouse = new MouseEvent('click');
      this.selectMarker(marker, fakeMouse);
    } else {
      this.selectMarker(marker, event as unknown as MouseEvent);
    }
  }

  selectMarker(marker: GameMarker, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.markerClick.emit(marker);
  }

  onMarkerHover(marker: GameMarker): void {
    if (marker.type === 'stairs_down' || 
        marker.type === 'stairs_up' || 
        marker.type === 'stairs_up_down' || 
        marker.type === 'comms') {
      this.hoveredMarkerId = marker.id;
    }
  }

  onMarkerHoverLeave(): void {
    this.hoveredMarkerId = null;
  }

  shouldShowTooltip(marker: GameMarker): boolean {
    if (this.selectedMarker?.id === marker.id) return true;
    if ((marker.type === 'stairs_down' || 
         marker.type === 'stairs_up' || 
         marker.type === 'stairs_up_down' || 
         marker.type === 'comms') && 
        this.hoveredMarkerId === marker.id) return true;
    return false;
  }
}
