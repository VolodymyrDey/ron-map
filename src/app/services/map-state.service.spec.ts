import { TestBed } from '@angular/core/testing';
import { MapStateService } from './map-state.service';

describe('MapStateService', () => {
  let service: MapStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with legend items', () => {
    const state = service.getUIState();
    expect(state.legendItems.length).toBeGreaterThan(0);
    expect(state.showMarkerForm).toBe(false);
  });

  it('should show and hide marker form', () => {
    service.showMarkerForm(50, 50);
    let state = service.getUIState();
    expect(state.showMarkerForm).toBe(true);
    expect(state.newMarkerX).toBe(50);
    expect(state.newMarkerY).toBe(50);

    service.hideMarkerForm();
    state = service.getUIState();
    expect(state.showMarkerForm).toBe(false);
  });

  it('should toggle legend items', () => {
    const state = service.getUIState();
    const firstItem = state.legendItems[0];
    const initialVisibility = firstItem.visible;

    service.toggleLegendItem(firstItem.id);
    const updatedState = service.getUIState();
    const updatedItem = updatedState.legendItems.find(item => item.id === firstItem.id);
    
    expect(updatedItem?.visible).toBe(!initialVisibility);
  });

  it('should show all legend items', () => {
    service.hideAllLegendItems();
    service.showAllLegendItems();
    
    const state = service.getUIState();
    const allVisible = state.legendItems.every(item => item.visible);
    expect(allVisible).toBe(true);
  });

  it('should hide all legend items', () => {
    service.hideAllLegendItems();
    
    const state = service.getUIState();
    const allHidden = state.legendItems.every(item => !item.visible);
    expect(allHidden).toBe(true);
  });
});
