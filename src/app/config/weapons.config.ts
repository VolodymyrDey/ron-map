export interface Weapon {
  id: string;
  name: string;
  picture: string;
}

export const WEAPONS: Weapon[] = [
  { id: '870cqb', name: '870CQB', picture: './weapons/870cqb.png' },
  { id: 'arn-180', name: 'ARN-180', picture: './weapons/arn-180.png' },
  { id: 'g19', name: 'G19', picture: './weapons/g19.png' },
  { id: 'm32a1_flash', name: 'M32A1 Flash', picture: './weapons/m32a1_flash.png' },
  { id: 'mp5a2', name: 'MP5A2', picture: './weapons/mp5a2.png' }
];
