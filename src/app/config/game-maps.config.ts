import { GameMapConfig } from '../services/game-map';

export const GAME_MAPS: GameMapConfig[] = [
  // 1
  {
    id: '4U_gas',
    name: 'Thank You, Come Again / 4U Gas Station',
    width: 3840,
    height: 2160,
    description: 'Thank You, Come Again is the first mission in Ready or Not, chronologically and accessibly. On February 3, 2025, the Los Sueños Police Department responds to teenage meth addicts robbing a downtown 4U gas station. ',
    layers: [
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/1_4U_gas/4U_Gas_Station.png', visible: true, zIndex: 1, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 58.36, y: 81.82, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 59.07, y: 28.8, title: 'Report Incapacitated Veteran', description: 'Locate a downed civilian, a veteran, killed on scene by the suspects', type: 'soft_objective', layerId: 'ground' },
      { id: 'm3', x: 48.05, y: 30.99, title: 'Find Cristal Leighton', description: 'Locate the civilian, Cristal Leighton; a minor hiding somewhere at the crime scene', type: 'hard_objective', layerId: 'ground' },
      { id: 'm4', x: 55.88, y: 41.67, title: 'Find the Store Manager', description: 'Locate the civilian, responsible for the initial call to dispatch, who has since been unresponsive', type: 'hard_objective', layerId: 'ground' }
    ]
  },
  // 2
  {
    id: '23_mb',
    name: '23 Megabytes a Second / San Uriel Condominiums',
    width: 2160,
    height: 3840,
    description: '23 Megabytes a Second is the second mission in Ready or Not. On December 8, 2025, the Los Sueños Police Department received a 911 call regarding a hostage situation at an apartment complex.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/2_23_mb/23_mb_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/2_23_mb/23_mb_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/2_23_mb/23_mb_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 46.72, y: 76.78, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 60.42, y: 64.08, title: 'Report Illegal Server Farm', description: 'Locate the source of electricity theft: an illegal server cluster, farming cryptocurrency and hosting online illegal activity', type: 'soft_objective', layerId: 'floor1' },
      { id: 'm3', x: 36.3, y: 61.45, title: 'Report Suspect\'s PC', description: 'Locate the suspect\'s personal computer, showing incriminating evidence in connection to \'Mindjot\'', type: 'soft_objective', layerId: 'floor2' },
      { id: 'm4', x: 41.76, y: 62.61, title: 'Report Photographic evidence', description: 'Locate document evidences related to "Mindjot" in suspect\'s bedroom', type: 'soft_objective', layerId: 'floor2' },
      { id: 'm5', x: 42.35, y: 38.38, title: 'Arest Michael', description: 'Michael is main target and he is usually located in his appartment on second floor. Check all rooms. He wears headset with kitty ears.', type: 'hard_objective', layerId: 'floor2' },
      // Stairs ground
      { id: 'm6', x: 47.9, y: 21.05, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'm7', x: 54.37, y: 61.76, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      // Stairs first
      { id: 'm8', x: 37.66, y: 23.6, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'm9', x: 44.3, y: 21.47, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'm10', x: 50.97, y: 23.6, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'm11', x: 63.87, y: 74.04, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'm12', x: 60.76, y: 77.3, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      // Stairs second
      { id: 'm13', x: 49.7, y: 25.98, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'm14', x: 62.31, y: 25.98, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'm15', x: 59.71, y: 69.12, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' }
    ]
  },
  // 3
  {
    id: '213_park',
    name: 'Twisted Nerve / 213 Park Homes',
    width: 2160,
    height: 3840,
    description: 'Twisted Nerve is the third playable mission in Ready or Not. On September 29, 2025, D Platoon are sent to a neighborhood with the objective of shutting down residential homes involved with the production and distribution of methamphetamine.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/3_213_park/213_park_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/3_213_park/213_park_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/3_213_park/213_park_ground.png', visible: true, zIndex: 3, isDefault: true },
      { id: 'underground', name: 'Underground', imageUrl: '/maps/3_213_park/213_park_underground.png', visible: false, zIndex: 4 }
    ],
    markers: [
      { id: 'm1', x: 40.17, y: 64.15, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' }
      // Stairs ground
      // Stairs roof
    ]
  },
  // 4
  {
    id: 'brixley_talent',
    name: 'The Spider / Brixley talent time',
    width: 2160,
    height: 3840,
    description: 'The Spider is the fourth playable mission in Ready or Not. Hard drives seized during a raid on the apartment of Michael Williams contained child pornography which implicated Brixley\'s Talent Time in a child pornography ring. On December 21, 2025, D-Platoon have been dispatched to serve a high risk arrest warrant for George Brixley. Seemingly unaware of this development, Brixley continues to groom potential clients - But, forever unwilling to take any chances, has hired several low lives as armed security. Alerted by the arrival of the LSPD, Brixley and his men have barricaded themselves inside, holding several civilians hostage.',
    layers: [
      { id: 'roof', name: 'Roof', imageUrl: '/maps/4_brixley_talent/brixley_talent_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/4_brixley_talent/brixley_talent_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 44.41, y: 32.18, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' }
      // Stairs first
      // Stairs second
    ]
  },
  // 5
  {
    id: 'sullivans_slope',
    name: 'A lethal obsession / Sullivan\'s Slope',
    width: 1080,
    height: 1920,
    description: 'A Lethal Obsession is the fifth mission in Ready or Not. Gerard Scott, 55, a former USIA analyst, waited out the front of East Makade Police Department with a loaded Mini-14 after setting a car alight on the street in front of the department. He then shot at officers while they attempted to extinguish the alighted vehicle. Witnesses on the street reported his vehicle as he drove away. On August 20, 2025, D Platoon is sent to service his warrant. ',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/5_sullivans_slope/Sullivans slope_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/5_sullivans_slope/Sullivans slope_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/5_sullivans_slope/Sullivans slope_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      // Spawn
      { id: 'm1', x: 48.57, y: 88.65, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' },
      // Hard objectives
      { id: 'm2', x: 50.17, y: 52.13, title: 'Arrest Gerard Scott', description: 'Apprehend and secure the prime suspect - Gerard Scott. He is usually located somwere incide apartment and wears armored suite', type: 'hard_objective', layerId: 'ground' },
      // Soft objectives
      { id: 'm3', x: 46.18, y:  71.03, title: 'Report Stolen Federal Documents', description: 'Locate missing federal documents, found on the suspect\'s property', type: 'soft_objective', layerId: 'floor1' },
      // Stairs
      { id: 'm4', x: 47.23, y: 69.53, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'm5', x: 44.75, y: 60.79, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'm6', x: 49.46, y: 24.04, title: 'To First Floor', type: 'stairs_up', layerId: 'ground' },
      { id: 'm7', x: 52.19, y: 91.37, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'm8', x: 43.42, y: 76.27, title: 'To Ground Floor', type: 'stairs_down', layerId: 'floor1' },
      { id: 'm9', x: 49.02, y: 51.12, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'm10', x: 55.18, y: 11.86, title: 'To Second Floor', type: 'stairs_up', layerId: 'floor1' },
      { id: 'm11', x: 48.97, y: 53.61, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      { id: 'm12', x: 50.19, y: 6.3, title: 'To First Floor', type: 'stairs_down', layerId: 'floor2' },
      // Comms achivements
      { id: 'm13', x: 48.06, y: 46.56, title: 'Speaker', type: 'comms', layerId: 'ground' },
      { id: 'm14', x: 47.83, y: 52.29, title: 'Speaker', type: 'comms', layerId: 'ground' },
      { id: 'm15', x: 46.38, y: 47.71, title: 'Speaker', type: 'comms', layerId: 'floor1' },
      { id: 'm16', x: 62.24, y: 72.07, title: 'Speaker', type: 'comms', layerId: 'floor1' },
      { id: 'm17', x: 54.08, y: 45.69, title: 'Speaker', type: 'comms', layerId: 'floor2' },
      { id: 'm18', x: 45.06, y: 76.75, title: 'Speaker', type: 'comms', layerId: 'floor2' },
      { id: 'm19', x: 54.87, y: 67.04, title: 'Speaker', type: 'comms', layerId: 'floor2' }
    ]
  },
  // 6
  {
    id: 'brisa_cove',
    name: 'Ides of march / Brisa Cove',
    width: 1080,
    height: 1920,
    description: 'Ides of March is the sixth playable mission in Ready or Not. A group of domestic terrorists have occupied the luxury Brisa Cove Apartments, taking several residents hostage. On October 1, 2025, D-Platoon have been dispatched to neutralize the threat and defuse the situation ahead of the Senator\'s upcoming presidential campaign.',
    layers: [
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/6_brisa_cove/brisa_cove_ground.png', visible: true, zIndex: 1, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 51.45, y: 70.77, title: 'Fire exit', description: 'Fire exit', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 39.27, y: 28.08, title: 'Residential staircase', description: 'Residential staircase', type: 'spawn', layerId: 'ground' }
    ]
  },
  // 7
  {
    id: 'mindjot',
    name: 'Sinuous trail / Mindjot data center',
    width: 1080,
    height: 1920,
    description: 'Sinuous Trail is the seventh playable mission in Ready or Not. On December 15, 2025, D-Platoon have been dispatched to serve a high risk search warrant at a Mindjot Datacenter suspected of being used by a child pornography ring.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/7_mindjot/mindjot_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/7_mindjot/mindjot_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/7_mindjot/mindjot_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 48.24, y: 67.39, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' }
    ]
  },
  // 8
  {
    id: 'kawayu_beach',
    name: 'Ends of the earth / Kawayu beach',
    width: 1080,
    height: 1920,
    description: 'Ends of the Earth is the eighth mission in Ready or Not. On December 3, 2025, the LSPD raid a home on the beachfront for distributing and illegally modifying weapons.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/8_kawayu_beach/kawayu_beach_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/8_kawayu_beach/kawayu_beach_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/8_kawayu_beach/kawayu_beach_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 36.5, y: 14.48, title: 'Street', description: 'Street', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 66.26, y: 95.18, title: 'Beach', description: 'Beach', type: 'spawn', layerId: 'ground' }
    ]
  },
  // 9
  {
    id: 'los_suenos_postal',
    name: 'Greased palms / Los Suenos Postal Service',
    width: 1080,
    height: 1920,
    description: 'Greased Palms is the ninth mission in Ready Or Not. On October 25, 2025, the Los Suenos Police Department responds to a shoot out at the Los Suenos Postal Service, and is ordered to arrest a weapons smuggler suspect.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/9_los_suenos_postal/los_suenos_postal_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/9_los_suenos_postal/los_suenos_postal_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 43.71, y: 67.41, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' }
    ]
  },
  // 10
  {
    id: 'voll_health_house',
    name: 'Valley of the Dolls / Voll Health house',
    width: 1080,
    height: 1920,
    description: 'Valley of the Dolls is the tenth playable mission in Ready or Not. The LSPD\'s cyber-crime team has found a lead pertaining to the person profiting from the illegal child-pornography ring operating in Los Sueños. Amos Voll owns a health house at 1962 Irwin Drive, Los Clemente, which is guarded by the security company, Bolton Security. With Amos\'s daughter, Janey Voll, having her 18th birthday, the LSPD decide to raid the home. This level takes place on January 5, 2026, making it the sixteenth mission chronologically.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/10_voll_health_house/voll_health_house_floor2.png', visible: true, zIndex: 1, isDefault: true },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/10_voll_health_house/voll_health_house_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/10_voll_health_house/voll_health_house_ground.png', visible: false, zIndex: 3},
      { id: 'underground', name: 'Underground', imageUrl: '/maps/10_voll_health_house/voll_health_house_underground.png', visible: false, zIndex: 4 }
    ],
    markers: [
      { id: 'm1', x: 52.94, y: 88.28, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'floor2' }
    ]
  },
  // 11
  {
    id: 'watt_college',
    name: 'Elephant / Watt Community college',
    width: 1080,
    height: 1920,
    description: 'Elephant is the eleventh (ninth chronologically) playable mission in Ready or Not. On October 17, 2025, four students commit a mass-shooting at Watt Community College, presumably due to a mixture of mental health issues and immense dissatisfaction with the current state of the United States. LSPD is able to contain the shooters in the Science Wing and D Platoon is sent in to neutralize the threat.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/11_watt_college/watt_college_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/11_watt_college/watt_college_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 41.83, y: 69.52, title: 'Southern Entrance', description: 'Southern Entrance', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 59.76, y: 33.96, title: 'Northern Exit', description: 'Northern Exit', type: 'spawn', layerId: 'ground' },
    ]
  },
  // 12
  {
    id: 'costa_vino',
    name: 'Rust Belt / Costa Vino Border Reserve',
    width: 1080,
    height: 1920,
    description: 'Rust Belt is the twelfth mission in Ready or Not. On October 15, 2025, D Platoon raid a coyote stash house on the Mexican border.',
    layers: [
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/12_costa_vino/costa_vino_ground.png', visible: true, zIndex: 1, isDefault: true },
      { id: 'underground', name: 'Underground', imageUrl: '/maps/12_costa_vino/costa_vino_underground.png', visible: false, zIndex: 2}
    ],
    markers: [
      { id: 'm1', x: 53.49, y: 84.99, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' }
    ]
  },
  // 13
  {
    id: 'clemente_hotel',
    name: 'Sins Of The Father / Clemente Hotel',
    width: 1080,
    height: 1920,
    description: 'Sins of The Father is the thirteenth mission in Ready or Not. On October 2, 2025, rogue Secret Service agents sympathetic to the plight of The Left Behind, have occupied the fourteenth floor of the Clemente Hotel, threatening to execute Senator Fremont\'s family on video. D Platoon is dispatched to neutralize the terrorists before they can carry out their threat.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/13_clemente_hotel/clemente_hotel_floor1.png', visible: true, zIndex: 1, isDefault: true },
      { id: 'floor2', name: 'First Floor', imageUrl: '/maps/13_clemente_hotel/clemente_hotel_floor2.png', visible: false, zIndex: 2},
      { id: 'roof', name: 'Roof', imageUrl: '/maps/13_clemente_hotel/clemente_hotel_roof.png', visible: false, zIndex: 3},
    ],
    markers: [
      { id: 'm1', x: 36.93, y: 50.71, title: 'Balcony', description: 'Balcony', type: 'spawn', layerId: 'floor1' },
      { id: 'm2', x: 61.76, y: 51.01, title: 'Elevator', description: 'Elevator', type: 'spawn', layerId: 'floor1' },
      { id: 'm3', x: 55.8, y: 40.77, title: 'Rooftop', description: 'Rooftop', type: 'spawn', layerId: 'roof' }
    ]
  },
  // 14
  {
    id: 'neon_nightclub',
    name: 'Neon Tomb / Neon Nightclub',
    width: 1080,
    height: 1920,
    description: 'Neon Tomb is the fourteenth playable mission in Ready or Not. The terrorist group, The Hand, has committed a mass shooting at the Neon Nightclub in response to US airstrikes targeting their shelters in Northern Yemen. D Platoon has been dispatched to bring an end to the massacre. The mission takes place on April 19, 2025, making it the chronologically second mission in the story. The attack killed approximately 60 people.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/14_neon_nightclub/neon_nightclub_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/14_neon_nightclub/neon_nightclub_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 61.18, y: 90.52, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' }
    ]
  },
  // 15
  {
    id: 'ceasars_cars_dealership',
    name: 'Buy Cheap, Buy Twice / Ceasar\'s Cars Dealership',
    width: 1080,
    height: 1920,
    description: 'Buy Cheap, Buy Twice is the fifteenth playable mission in Ready or Not. It takes place on February 10, 2026 at a rather large car dealership beside an extremely run down street, in which both Los Locos and the Russian Mafia have made a base for themselves. The map consists of three main areas ; The interior of the two-floor dealership, the car lot outside, and the mechanic shop behind the dealership. Enemies can be found in any of these. A few civilians are also present.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/15_ceasars_cars_dealership/ceasars_cars_dealership_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/15_ceasars_cars_dealership/ceasars_cars_dealership_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 65.25, y: 86.19, title: 'Street', description: 'Street', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 24.29, y: 80.36, title: 'Back alley', description: 'Back alley', type: 'spawn', layerId: 'ground' },
    ]
  },
  // 16
  {
    id: 'cherryessa_farm',
    name: 'Carriers of the vine / Cherryessa Farm',
    width: 1080,
    height: 1920,
    description: 'Carriers of the Vine is the sixteenth mission in Ready or Not. It has D Platoon being dispatched on June 1, 2025, to pacify a new age cult committing acts of vigilantism across Los Suenos.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/16_cherryessa_farm/cherryessa_farm_floor1.png', visible: false, zIndex: 1},
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/16_cherryessa_farm/cherryessa_farm_ground.png', visible: true, zIndex: 2, isDefault: true },
      { id: 'underground', name: 'Underground', imageUrl: '/maps/16_cherryessa_farm/cherryessa_farm_underground.png', visible: false, zIndex: 3},
    ],
    markers: [
      { id: 'm1', x: 60.67, y: 92.84, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' }
    ]
  },
  // 17
  {
    id: 'medical_center',
    name: 'Relapse / Coastal grove medical center',
    width: 1080,
    height: 1920,
    description: 'Relapse is the penultimate and seventeenth mission in Ready or Not. The mission takes place on May 8, 2025, as the third mission chronologically about 3 weeks after Neon Tomb. A leader of The Hand who took part in the shooting at the Neon Nightclub is taken into medical care. The group storms the Coastal Grove Medical Center in an attempt to prevent the suspect from being taken into police custody. The LSPD\'s SWAT team is deployed to intercept the cell.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/17_medical_center/medical_center_floor2.png', visible: false, zIndex: 1},
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/17_medical_center/medical_center_floor1.png', visible: false, zIndex: 2},
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/17_medical_center/medical_center_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 37.1, y: 92.17, title: 'Hospital main lobby', description: 'Hospital main lobby', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 59.2, y: 10.97, title: 'Underground parking lot entrance', description: 'Underground parking lot entrance', type: 'spawn', layerId: 'ground' }
    ]
  },
  // 18
  {
    id: 'port',
    name: 'Hide And Seek / Port Hokan',
    width: 1080,
    height: 1920,
    description: 'Hide and Seek is the last and eighteenth mission in Ready or Not. On February 18, 2026, the LSPD, along with the FISA and ATF, are inserted into Port Hokan to shut down a major arms distribution operation.',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/18_port/port_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/18_port/port_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/18_port/port_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 37.62, y: 91.12, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' }
    ]
  },
  // 19
  {
    id: 'greenside_dormitories',
    name: 'Dorms / Greenside dormitories',
    width: 3840,
    height: 2715,
    description: 'Dorms is a DLC mission in Ready or Not. Mass amounts of homeless people and drug addicts are seeking shelter in the abandoned Greenside Dormitories. Due to the structural instability and the location\'s history of attracting troublemakers, LSPD attempted to clear the building. However, the occupants resisted and an officer was shot in the leg; whether this was intentional or not is unknown. Other units are unavailable due to the current situation in the city, so SWAT is responsible for clearing the people out of the building.',
    layers: [
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/19_greenside_dormitories/greenside_dormitories_floor1.png', visible: false, zIndex: 1 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/19_greenside_dormitories/greenside_dormitories_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 15.29, y: 46.68, title: 'North exit', description: 'North exit', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 83.61, y: 74.31, title: 'South exit', description: 'South exit', type: 'spawn', layerId: 'ground' }
    ]
  },
  // 20
  {
    id: '25_hope_street',
    name: 'Narcos / 25 Hope Street, 213 Park',
    width: 3840,
    height: 2715,
    description: 'Narcos is a DLC mission in Ready or Not. Agent Mike Esperanza has had his cover blown and Los Locos have arrived at his home to torture and kill him. Screams loud enough to alert the entire neighbourhood have caused an LSPD response. Patrol officers are stretched thin due to Hurricane Antonio, so LSPD SWAT is called to the scene. Meanwhile, Esperanza has escaped his captors and has fled to a different place in the neighbourhood, warranting the Los Locos to search the neighbourhood to find him.',
    layers: [
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/20_25_hope_street/25_hope_street_ground.png', visible: true, zIndex: 2, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 46.81, y: 88.8, title: 'Main spawn point', description: 'Main spawn point', type: 'spawn', layerId: 'ground' }
    ]
  },
  // 21
  {
    id: '155_playa_vista_lane',
    name: 'Lawmaker / 155 Playa Vista Lane, Colina Beach',
    width: 3840,
    height: 2715,
    description: 'Lawmaker is a DLC level in Ready or Not. Members of the United Planet Front - an eco-terrorist group - have invaded the home of Sven Anderson-Lincoln - a wealthy lobbyist with connections to the oil industry. No civilians have been killed but many have been taken hostage. SWAT is deployed to rescue the hostages. ',
    layers: [
      { id: 'floor2', name: 'Second Floor', imageUrl: '/maps/21_155_playa_vista_lane/155_playa_vista_lane_floor2.png', visible: false, zIndex: 1 },
      { id: 'floor1', name: 'First Floor', imageUrl: '/maps/21_155_playa_vista_lane/155_playa_vista_lane_floor1.png', visible: false, zIndex: 2 },
      { id: 'ground', name: 'Ground Floor', imageUrl: '/maps/21_155_playa_vista_lane/155_playa_vista_lane_ground.png', visible: true, zIndex: 3, isDefault: true }
    ],
    markers: [
      { id: 'm1', x: 40.34, y: 94.26, title: 'Main entrance', description: 'Main entrance', type: 'spawn', layerId: 'ground' },
      { id: 'm2', x: 43.87, y: 8.06, title: 'Back entrance', description: 'Back entrance', type: 'spawn', layerId: 'ground' },
      { id: 'm3', x: 80.92, y: 46.15, title: 'Side entrance', description: 'Side entrance', type: 'spawn', layerId: 'ground' },
    ]
  }
];
