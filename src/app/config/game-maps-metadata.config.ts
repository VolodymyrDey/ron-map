import { GameMapConfig } from '../services/game-map';

export interface GameMapMetadata {
  id: string;
  name: string;
  width: number;
  height: number;
  order: number;
  category: 'base' | 'dlc';
  loader: () => Promise<GameMapConfig>;
}

export const GAME_MAPS_METADATA: GameMapMetadata[] = [
  {
    id: '4U_gas',
    name: 'Thank You, Come Again / 4U Gas Station',
    width: 3840,
    height: 2160,
    order: 1,
    category: 'base',
    loader: () => import('./maps/4U_gas.map').then(m => m.MAP_4U_GAS)
  },
  {
    id: '23_mb',
    name: '23 Megabytes a Second / San Uriel Condominiums',
    width: 2160,
    height: 3840,
    order: 2,
    category: 'base',
    loader: () => import('./maps/23_mb.map').then(m => m.MAP_23_MB)
  },
  {
    id: '213_park',
    name: 'Twisted Nerve / 213 Park Homes',
    width: 2160,
    height: 3840,
    order: 3,
    category: 'base',
    loader: () => import('./maps/213_park.map').then(m => m.MAP_213_PARK)
  },
  {
    id: 'brixley_talent',
    name: 'The Spider / Brixley talent time',
    width: 2160,
    height: 3840,
    order: 4,
    category: 'base',
    loader: () => import('./maps/brixley_talent.map').then(m => m.MAP_BRIXLEY_TALENT)
  },
  {
    id: 'sullivans_slope',
    name: 'A lethal obsession / Sullivan\'s Slope',
    width: 1080,
    height: 1920,
    order: 5,
    category: 'base',
    loader: () => import('./maps/sullivans_slope.map').then(m => m.MAP_SULLIVANS_SLOPE)
  },
  {
    id: 'brisa_cove',
    name: 'Ides of march / Brisa Cove',
    width: 1080,
    height: 1920,
    order: 6,
    category: 'base',
    loader: () => import('./maps/brisa_cove.map').then(m => m.MAP_BRISA_COVE)
  },
  {
    id: 'mindjot',
    name: 'Sinuous trail / Mindjot data center',
    width: 1080,
    height: 1920,
    order: 7,
    category: 'base',
    loader: () => import('./maps/mindjot.map').then(m => m.MAP_MINDJOT)
  },
  {
    id: 'kawayu_beach',
    name: 'Ends of the earth / Kawayu beach',
    width: 1080,
    height: 1920,
    order: 8,
    category: 'base',
    loader: () => import('./maps/kawayu_beach.map').then(m => m.MAP_KAWAYU_BEACH)
  },
  {
    id: 'los_suenos_postal',
    name: 'Greased palms / Los Suenos Postal Service',
    width: 1080,
    height: 1920,
    order: 9,
    category: 'base',
    loader: () => import('./maps/los_suenos_postal.map').then(m => m.MAP_LOS_SUENOS_POSTAL)
  },
  {
    id: 'voll_health_house',
    name: 'Valley of the Dolls / Voll Health house',
    width: 1080,
    height: 1920,
    order: 10,
    category: 'base',
    loader: () => import('./maps/voll_health_house.map').then(m => m.MAP_VOLL_HEALTH_HOUSE)
  },
  {
    id: 'watt_college',
    name: 'Elephant / Watt Community college',
    width: 1080,
    height: 1920,
    order: 11,
    category: 'base',
    loader: () => import('./maps/watt_college.map').then(m => m.MAP_WATT_COLLEGE)
  },
  {
    id: 'costa_vino',
    name: 'Rust Belt / Costa Vino Border Reserve',
    width: 1080,
    height: 1920,
    order: 12,
    category: 'base',
    loader: () => import('./maps/costa_vino.map').then(m => m.MAP_COSTA_VINO)
  },
  {
    id: 'clemente_hotel',
    name: 'Sins Of The Father / Clemente Hotel',
    width: 1080,
    height: 1920,
    order: 13,
    category: 'base',
    loader: () => import('./maps/clemente_hotel.map').then(m => m.MAP_CLEMENTE_HOTEL)
  },
  {
    id: 'neon_nightclub',
    name: 'Neon Tomb / Neon Nightclub',
    width: 1080,
    height: 1920,
    order: 14,
    category: 'base',
    loader: () => import('./maps/neon_nightclub.map').then(m => m.MAP_NEON_NIGHTCLUB)
  },
  {
    id: 'ceasars_cars_dealership',
    name: 'Buy Cheap, Buy Twice / Ceasar\'s Cars Dealership',
    width: 1080,
    height: 1920,
    order: 15,
    category: 'base',
    loader: () => import('./maps/ceasars_cars_dealership.map').then(m => m.MAP_CEASARS_CARS_DEALERSHIP)
  },
  {
    id: 'cherryessa_farm',
    name: 'Carriers of the vine / Cherryessa Farm',
    width: 1080,
    height: 1920,
    order: 16,
    category: 'base',
    loader: () => import('./maps/cherryessa_farm.map').then(m => m.MAP_CHERRYESSA_FARM)
  },
  {
    id: 'medical_center',
    name: 'Relapse / Coastal grove medical center',
    width: 1080,
    height: 1920,
    order: 17,
    category: 'base',
    loader: () => import('./maps/medical_center.map').then(m => m.MAP_MEDICAL_CENTER)
  },
  {
    id: 'port',
    name: 'Hide And Seek / Port Hokan',
    width: 1080,
    height: 1920,
    order: 18,
    category: 'base',
    loader: () => import('./maps/port.map').then(m => m.MAP_PORT)
  },
  {
    id: 'greenside_dormitories',
    name: 'Dorms / Greenside dormitories',
    width: 3840,
    height: 2715,
    order: 19,
    category: 'dlc',
    loader: () => import('./maps/greenside_dormitories.map').then(m => m.MAP_GREENSIDE_DORMITORIES)
  },
  {
    id: '25_hope_street',
    name: 'Narcos / 25 Hope Street, 213 Park',
    width: 3840,
    height: 2715,
    order: 20,
    category: 'dlc',
    loader: () => import('./maps/25_hope_street.map').then(m => m.MAP_25_HOPE_STREET)
  },
  {
    id: '155_playa_vista_lane',
    name: 'Lawmaker / 155 Playa Vista Lane, Colina Beach',
    width: 3840,
    height: 2715,
    order: 21,
    category: 'dlc',
    loader: () => import('./maps/155_playa_vista_lane.map').then(m => m.MAP_155_PLAYA_VISTA_LANE)
  }
];
