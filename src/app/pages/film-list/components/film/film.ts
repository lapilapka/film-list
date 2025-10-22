import {Component, input} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {Film} from '../../../../shared/models/film.model';

@Component({
  selector: 'app-film-item',
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './film.html',
  styleUrl: './film.scss'
})
export class FilmItem {
readonly film = input<Film>();
}
