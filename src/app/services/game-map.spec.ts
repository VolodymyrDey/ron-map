import { TestBed } from '@angular/core/testing';

import { GameMap } from './game-map';

describe('GameMap', () => {
  let service: GameMap;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameMap);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
