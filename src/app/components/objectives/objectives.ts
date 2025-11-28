import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

export interface ObjectiveItem {
  id: string;
  title: string;
  description?: string;
  type: 'hard' | 'soft';
  completed?: boolean;
  markerIds?: string[]; // IDs of markers associated with this objective
  floorName?: string; // Name of the floor where objective is located
}

@Component({
  selector: 'app-objectives',
  imports: [CommonModule],
  templateUrl: './objectives.html',
  styleUrl: './objectives.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectivesComponent {
  @Input() objectives: ObjectiveItem[] = [];
  @Input() mapName: string = '';
  @Output() objectiveToggled = new EventEmitter<string>();
  
  isExpanded: boolean = true;
  isHardSectionExpanded: boolean = true;
  isSoftSectionExpanded: boolean = true;

  constructor(private readonly languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  toggleHardSection(event: Event): void {
    event.stopPropagation();
    this.isHardSectionExpanded = !this.isHardSectionExpanded;
  }

  toggleSoftSection(event: Event): void {
    event.stopPropagation();
    this.isSoftSectionExpanded = !this.isSoftSectionExpanded;
  }

  toggleObjective(objectiveId: string, event: Event): void {
    event.stopPropagation();
    this.objectiveToggled.emit(objectiveId);
  }

  get hardObjectives(): ObjectiveItem[] {
    return this.objectives.filter(obj => obj.type === 'hard');
  }

  get softObjectives(): ObjectiveItem[] {
    return this.objectives.filter(obj => obj.type === 'soft');
  }

  get totalObjectives(): number {
    return this.objectives.length;
  }

  get completedObjectives(): number {
    return this.objectives.filter(obj => obj.completed).length;
  }
}
