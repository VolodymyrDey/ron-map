export interface Consumable {
  id: string;
  name: string;
  picture: string;
}

export const CONSUMABLES: Consumable[] = [
  { id: 'flashbang', name: 'Flashbang', picture: '/assets/consumables/flashbang.png' },
  { id: 'stinger', name: 'Stinger Grenade', picture: '/assets/consumables/stinger.png' },
  { id: 'cs_gas', name: 'CS Gas', picture: '/assets/consumables/cs_gas.png' },
  { id: 'pepper_spray', name: 'Pepper Spray', picture: '/assets/consumables/pepper_spray.png' },
  { id: 'taser', name: 'Taser', picture: '/assets/consumables/taser.png' },
  { id: 'door_wedge', name: 'Door Wedge', picture: '/assets/consumables/door_wedge.png' },
  { id: 'breaching_charge', name: 'Breaching Charge', picture: '/assets/consumables/breaching_charge.png' },
  { id: 'c2', name: 'C2 Explosive', picture: '/assets/consumables/c2.png' }
];
