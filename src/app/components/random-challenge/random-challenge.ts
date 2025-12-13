import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { GameMapMetadata } from '../../config/game-maps-metadata.config';
import { WEAPONS, Weapon } from '../../config/weapons.config';
import { DIFFICULTIES, Difficulty } from '../../config/difficulties.config';
import { CONSUMABLES, Consumable } from '../../config/consumables.config';
import { ArmorConfig, generateRandomArmor, getArmorTypeName, getArmorCoverageName, getArmorMaterialName } from '../../config/armor.config';

interface ChallengeResult {
  map: GameMapMetadata;
  weapon: Weapon;
  difficulty: Difficulty;
  consumable?: Consumable;
  armor?: ArmorConfig;
}

type ChallengeDifficulty = 'easy' | 'medium' | 'hard';

@Component({
  selector: 'app-random-challenge',
  imports: [CommonModule],
  templateUrl: './random-challenge.html',
  styleUrl: './random-challenge.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomChallengeComponent {
  @Input() maps: GameMapMetadata[] = [];
  @Output() modalStateChanged = new EventEmitter<boolean>();

  showChallenge = false;
  isRolling = false;
  isRerollingMap = false;
  isRerollingWeapon = false;
  isRerollingDifficulty = false;
  isRerollingConsumable = false;
  isRerollingArmor = false;
  result: ChallengeResult | null = null;
  
  challengeDifficulty: ChallengeDifficulty = 'easy';
  
  weapons = WEAPONS;
  difficulties = DIFFICULTIES;
  consumables = CONSUMABLES;

  private readonly REROLL_DELAY = 1000;

  constructor(
    private readonly languageService: LanguageService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  openChallenge(): void {
    this.showChallenge = true;
    this.modalStateChanged.emit(true);
    this.cdr.markForCheck();
  }

  closeChallenge(): void {
    this.showChallenge = false;
    this.result = null;
    this.isRolling = false;
    this.modalStateChanged.emit(false);
    this.cdr.markForCheck();
  }

  setChallengeDifficulty(difficulty: ChallengeDifficulty): void {
    this.challengeDifficulty = difficulty;
    this.result = null;
    this.cdr.markForCheck();
  }

  rollChallenge(): void {    
    if (this.isRolling || this.maps.length === 0) {
      console.warn('Cannot roll: isRolling=', this.isRolling, 'maps.length=', this.maps.length);
      return;
    }

    this.isRolling = true;
    this.result = null;
    this.cdr.markForCheck();

    setTimeout(() => {
      const randomMap = this.maps[Math.floor(Math.random() * this.maps.length)];
      const randomWeapon = this.weapons[Math.floor(Math.random() * this.weapons.length)];
      const randomDifficulty = this.difficulties[Math.floor(Math.random() * this.difficulties.length)];

      this.result = {
        map: randomMap,
        weapon: randomWeapon,
        difficulty: randomDifficulty
      };

      // Add consumable for medium and hard
      if (this.challengeDifficulty === 'medium' || this.challengeDifficulty === 'hard') {
        const randomConsumable = this.consumables[Math.floor(Math.random() * this.consumables.length)];
        this.result.consumable = randomConsumable;
      }

      // Add armor for hard
      if (this.challengeDifficulty === 'hard') {
        this.result.armor = generateRandomArmor();
      }

      this.isRolling = false;
      this.cdr.markForCheck();
    }, this.REROLL_DELAY);
  }

  rerollMap(): void {
    if (!this.result || this.maps.length === 0 || this.isRerollingMap) return;
    
    this.isRerollingMap = true;
    this.cdr.markForCheck();
    
    setTimeout(() => {
      if (this.result) {
        const randomMap = this.maps[Math.floor(Math.random() * this.maps.length)];
        this.result.map = randomMap;
      }
      this.isRerollingMap = false;
      this.cdr.markForCheck();
    }, this.REROLL_DELAY);
  }

  rerollWeapon(): void {
    if (!this.result || this.isRerollingWeapon) return;
    
    this.isRerollingWeapon = true;
    this.cdr.markForCheck();
    
    setTimeout(() => {
      if (this.result) {
        const randomWeapon = this.weapons[Math.floor(Math.random() * this.weapons.length)];
        this.result.weapon = randomWeapon;
      }
      this.isRerollingWeapon = false;
      this.cdr.markForCheck();
    }, this.REROLL_DELAY);
  }

  rerollDifficulty(): void {
    if (!this.result || this.isRerollingDifficulty) return;
    
    this.isRerollingDifficulty = true;
    this.cdr.markForCheck();
    
    setTimeout(() => {
      if (this.result) {
        const randomDifficulty = this.difficulties[Math.floor(Math.random() * this.difficulties.length)];
        this.result.difficulty = randomDifficulty;
      }
      this.isRerollingDifficulty = false;
      this.cdr.markForCheck();
    }, this.REROLL_DELAY);
  }

  rerollConsumable(): void {
    if (!this.result || this.isRerollingConsumable) return;
    
    this.isRerollingConsumable = true;
    this.cdr.markForCheck();
    
    setTimeout(() => {
      if (this.result) {
        const randomConsumable = this.consumables[Math.floor(Math.random() * this.consumables.length)];
        this.result.consumable = randomConsumable;
      }
      this.isRerollingConsumable = false;
      this.cdr.markForCheck();
    }, this.REROLL_DELAY);
  }

  rerollArmor(): void {
    if (!this.result || this.isRerollingArmor) return;
    
    this.isRerollingArmor = true;
    this.cdr.markForCheck();
    
    setTimeout(() => {
      if (this.result) {
        this.result.armor = generateRandomArmor();
      }
      this.isRerollingArmor = false;
      this.cdr.markForCheck();
    }, this.REROLL_DELAY);
  }

  getArmorTypeName(typeId: string): string {
    return getArmorTypeName(typeId);
  }

  getArmorCoverageName(coverageId: string): string {
    return getArmorCoverageName(coverageId);
  }

  getArmorMaterialName(materialId: string): string {
    return getArmorMaterialName(materialId);
  }

  navigateToMap(map: GameMapMetadata): void {
    this.router.navigate(['/map', map.route]);
    this.closeChallenge();
  }
}
