import { GameMapConfig } from '../../services/game-map';

export const MAP_MINDJOT: GameMapConfig = {
  id: 'mindjot',
  name: 'Sinuous trail / Mindjot data center',
  width: 1080,
  height: 1920,
  description: 'Sinuous Trail is the seventh playable mission in Ready or Not. On December 15, 2025, D-Platoon have been dispatched to serve a high risk search warrant at a Mindjot Datacenter suspected of being used by a child pornography ring.',
  layers: [
    { id: 'floor2', name: 'Second Floor', imageUrl: './maps/7_mindjot/mindjot_floor2.png', visible: false, zIndex: 1 },
    { id: 'floor1', name: 'First Floor', imageUrl: './maps/7_mindjot/mindjot_floor1.png', visible: false, zIndex: 2 },
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/7_mindjot/mindjot_ground.png', visible: true, zIndex: 3, isDefault: true }
  ],
  markers: [
    { id: 'spawn1', x: 48.24, y: 67.39, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
    { id: 'stairs_up1', x: 61.62, y: 28.84, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
    { id: 'stairs_up2', x: 46, y: 30.6, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
    { id: 'stairs_up3', x: 52.84, y: 30.64, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
    { id: 'stairs_up4', x: 32.45, y: 41.08, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
    { id: 'stairs_down1', x: 31.93, y: 24.48, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
    { id: 'stairs_down2', x: 48.55, y: 23.81, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
    { id: 'stairs_down3', x: 72.46, y: 18.92, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
    { id: 'stairs_down4', x: 36.69, y: 55.6, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' }
  ]
};
