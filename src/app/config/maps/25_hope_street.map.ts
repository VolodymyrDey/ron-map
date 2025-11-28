import { GameMapConfig } from '../../services/game-map';

export const MAP_25_HOPE_STREET: GameMapConfig = {
  id: '25_hope_street',
  name: 'Narcos / 25 Hope Street, 213 Park',
  width: 3840,
  height: 2715,
  description: 'Narcos is a DLC mission in Ready or Not. Agent Mike Esperanza has had his cover blown and Los Locos have arrived at his home to torture and kill him. Screams loud enough to alert the entire neighbourhood have caused an LSPD response. Patrol officers are stretched thin due to Hurricane Antonio, so LSPD SWAT is called to the scene. Meanwhile, Esperanza has escaped his captors and has fled to a different place in the neighbourhood, warranting the Los Locos to search the neighbourhood to find him.',
  layers: [
    { id: 'ground', name: 'Ground Floor', imageUrl: './maps/20_25_hope_street/25_hope_street_ground.png', visible: true, zIndex: 2, isDefault: true }
  ],
  markers: [
    { id: 'spawn1', x: 46.81, y: 88.8, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
    { id: 'soft_objective1', x: 56.55, y: 72.89, title: 'Find the hidden documents', description: 'Locate the LSPD documents hidden in the house', type: 'soft_objective', layerId: 'ground' },
    { id: 'soft_objective2', x: 52.86, y: 76.11, title: 'Reported Crime scene', description: 'The informant\'s home has been ransacked, with signs of a struggle', type: 'soft_objective', layerId: 'ground' },
    { id: 'hard_objective1', x: 51.81, y: 25.09, title: 'Possible Informant location', description: 'Locate and secure the Informant', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective2', x: 48.23, y: 15.83, title: 'Possible Informant location', description: 'Locate and secure the Informant', type: 'hard_objective', layerId: 'ground' },
    { id: 'hard_objective3', x: 63.7, y: 21.8, title: 'Possible Informant location', description: 'Locate and secure the Informant', type: 'hard_objective', layerId: 'ground' },
    { id: 'soft_objective3', x: 60.29, y: 55.71, title: 'Found crime sceene evidence', description: 'Report Dead Dog killed in neibors appartment', type: 'soft_objective', layerId: 'ground' }
  ],
  objectives: [
    { id: 'obj_order', title: 'Bring order to chaos.', description: 'Arrest or neutralize any contact at the scene', type: 'hard' },
    { id: 'obj_rescue', title: 'Rescue all civilians.', description: 'Detain any unarmed contacts at the scene', type: 'hard' },
    { id: 'obj1', title: 'Locate and Secure the Informant', description: 'Locate and secure the Informant', type: 'hard', markerIds: ['hard_objective1', 'hard_objective2', 'hard_objective3'], floorName: 'Ground Floor' },
    { id: 'obj2', title: 'Find the Hidden Documents', description: 'Locate the LSPD documents hidden in the house', type: 'soft', markerIds: ['soft_objective1'], floorName: 'Ground Floor' },
    { id: 'obj3', title: 'Reported Crime Scene', description: 'The informant\'s home has been ransacked, with signs of a struggle', type: 'soft', markerIds: ['soft_objective2'], floorName: 'Ground Floor' },
    { id: 'obj4', title: 'Found Crime Scene Evidence', description: 'Report Dead Dog killed in neighbors apartment', type: 'soft', markerIds: ['soft_objective3'], floorName: 'Ground Floor' }
  ]
};
