export interface Weapon {
  id: string;
  name: string;
  picture: string;
}

export const WEAPONS: Weapon[] = [
  { id: 'hk416', name: 'HK416', picture: '/assets/weapons/hk416.png' },
  { id: 'm4a1', name: 'M4A1', picture: '/assets/weapons/m4a1.png' },
  { id: 'mp5', name: 'MP5', picture: '/assets/weapons/mp5.png' },
  { id: 'mp7', name: 'MP7', picture: '/assets/weapons/mp7.png' },
  { id: 'ump45', name: 'UMP-45', picture: '/assets/weapons/ump45.png' },
  { id: 'ak47', name: 'AK-47', picture: '/assets/weapons/ak47.png' },
  { id: 'scar', name: 'SCAR-H', picture: '/assets/weapons/scar.png' },
  { id: 'g36c', name: 'G36C', picture: '/assets/weapons/g36c.png' },
  { id: 'sg552', name: 'SG 552', picture: '/assets/weapons/sg552.png' },
  { id: 'benelli_m4', name: 'Benelli M4', picture: '/assets/weapons/benelli_m4.png' },
  { id: 'remington_870', name: 'Remington 870', picture: '/assets/weapons/remington_870.png' },
  { id: 'm249', name: 'M249 SAW', picture: '/assets/weapons/m249.png' },
  { id: 'sr25', name: 'SR-25', picture: '/assets/weapons/sr25.png' },
  { id: 'tavor_7', name: 'Tavor 7', picture: '/assets/weapons/tavor_7.png' },
  { id: 'mk18', name: 'MK18', picture: '/assets/weapons/mk18.png' }
];
