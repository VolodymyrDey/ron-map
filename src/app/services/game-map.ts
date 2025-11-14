import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GameMarker {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  type: 'spawn' | 'resource' | 'wonder' | 'unit' | 'custom';
  color?: string;
  icon?: string;
}

export interface GameMapConfig {
  id: string;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
  markers: GameMarker[];
  description?: string;
}

@Injectable({
  providedIn: 'root',
})

export class GameMapService {
  private currentMapSubject = new BehaviorSubject<GameMapConfig | null>(null);
  public currentMap$ = this.currentMapSubject.asObservable();

  private markersSubject = new BehaviorSubject<GameMarker[]>([]);
  public markers$ = this.markersSubject.asObservable();

  private gameMaps: GameMapConfig[] = [
    {
      id: 'ancient-world',
      name: '4U Gas Station',
      imageUrl: '/maps/4U_Gas_Station.png',
      width: 1200,
      height: 800,
      description: 'Thank You, Come Again is the first mission in Ready or Not, chronologically and accessibly. On February 3, 2025, the Los Sueños Police Department responds to teenage meth addicts robbing a downtown 4U gas station. ',
      markers: [
        { id: 'm1', x: 1281, y: 1004, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', color: '#FF6B6B' },
        { id: 'm2', x: 350, y: 500, title: 'Gold Deposit', description: 'Gold resource', type: 'resource', color: '#FFD700' },
        { id: 'm3', x: 700, y: 600, title: 'Colossus', description: 'Wonder of the world', type: 'wonder', color: '#95E1D3' }
      ]
    },
    {
      id: 'medieval-realm',
      name: 'Medieval Realm',
      imageUrl: '/maps/medieval-realm.svg',
      width: 1200,
      height: 800,
      description: 'Medieval fantasy-inspired map',
      markers: [
        { id: 'm1', x: 300, y: 200, title: 'Kingdom', description: 'Main kingdom', type: 'spawn', color: '#667BC6' },
        { id: 'm2', x: 600, y: 300, title: 'Forest', description: 'Enchanted forest', type: 'resource', color: '#52B788' },
        { id: 'm3', x: 900, y: 500, title: 'Dragon Lair', description: 'Ancient dragon lair', type: 'unit', color: '#D62828' }
      ]
    },
    {
      id: 'brisa-cove',
      name: 'Brisa Cove',
      imageUrl: '/maps/Brisa_Cove.png',
      width: 1200,
      height: 800,
      description: 'Ides of March is the sixth playable mission in Ready or Not. A group of domestic terrorists have occupied the luxury Brisa Cove Apartments, taking several residents hostage. On October 1, 2025, D-Platoon have been dispatched to neutralize the threat and defuse the situation ahead of the Senator\'s upcoming presidential campaign. ',
      markers: [
        { id: 'm1', x: 300, y: 200, title: 'Kingdom', description: 'Main kingdom', type: 'spawn', color: '#667BC6' },
        { id: 'm2', x: 600, y: 300, title: 'Forest', description: 'Enchanted forest', type: 'resource', color: '#52B788' },
        { id: 'm3', x: 900, y: 500, title: 'Dragon Lair', description: 'Ancient dragon lair', type: 'unit', color: '#D62828' }
      ]
    }
  ];

  getAvailableMaps(): GameMapConfig[] {
    return this.gameMaps;
  }

  loadMap(mapId: string): void {
    const map = this.gameMaps.find(m => m.id === mapId);
    if (map) {
      this.currentMapSubject.next(map);
      this.markersSubject.next(map.markers);
    }
  }

  getCurrentMap(): GameMapConfig | null {
    return this.currentMapSubject.getValue();
  }
}
