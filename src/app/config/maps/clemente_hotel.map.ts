import { GameMapConfig } from '../../services/game-map';

export const MAP_CLEMENTE_HOTEL: GameMapConfig = {
  id: 'clemente_hotel',
  name: 'Sins Of The Father / Clemente Hotel',
  width: 1080,
  height: 1920,
  description: 'Sins of The Father is the thirteenth mission in Ready or Not. On October 2, 2025, rogue Secret Service agents sympathetic to the plight of The Left Behind, have occupied the fourteenth floor of the Clemente Hotel, threatening to execute Senator Fremont\'s family on video. D Platoon is dispatched to neutralize the terrorists before they can carry out their threat.',
  layers: [
    { id: 'roof', name: 'Roof', imageUrl: './maps/13_clemente_hotel/clemente_hotel_roof.png', visible: false, zIndex: 1 },
    { id: 'floor2', name: 'Second Floor', imageUrl: './maps/13_clemente_hotel/clemente_hotel_floor2.png', visible: false, zIndex: 2 },
    { id: 'floor1', name: 'First Floor', imageUrl: './maps/13_clemente_hotel/clemente_hotel_floor1.png', visible: true, zIndex: 3, isDefault: true }
  ],
  markers: [
    { id: 'spawn1', x: 36.93, y: 50.71, title: 'Balcony', description: 'Balcony', type: 'spawn', layerId: 'floor1' },
    { id: 'spawn2', x: 61.76, y: 51.01, title: 'Elevator', description: 'Elevator', type: 'spawn', layerId: 'floor1' },
    { id: 'spawn3', x: 55.8, y: 40.77, title: 'Rooftop', description: 'Rooftop', type: 'spawn', layerId: 'roof' },
    { id: 'stairs_up1', x: 60.8, y: 41.81, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
    { id: 'stairs_up2', x: 43.85, y: 39.2, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
    { id: 'stairs_up3', x: 54.68, y: 53.23, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
    { id: 'stairs_up_down1', x: 57.65, y: 56.31, title: 'To Roof / To First Floor', type: 'stairs_up_down', layerId: 'floor2' },
    { id: 'stairs_down1', x: 76.01, y: 30.17, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
    { id: 'stairs_down2', x: 38.4, y: 24.27, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
    { id: 'stairs_down3', x: 42.21, y: 81.41, title: 'To Second Floor', type: 'stairs_down', layerId: 'roof' }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' }
  ]
};
