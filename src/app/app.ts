import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FilmList} from './pages/film-list/film-list';

@Component({
  selector: 'app-root',
  imports: [FilmList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
