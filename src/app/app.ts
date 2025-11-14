import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameMapComponent } from './components/game-map/game-map';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameMapComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('RoN Interactive Map');
}
