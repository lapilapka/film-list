import {Component, effect, inject, linkedSignal, signal, viewChild} from '@angular/core';
import {Film} from '../../shared/models/film.model';
import {FilmItem} from './components/film/film';
import {MatMenu, MatMenuContent, MatMenuTrigger} from '@angular/material/menu';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {catchError, debounceTime, of, tap} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatTooltip} from '@angular/material/tooltip';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-film-list',
  imports: [
    FilmItem,
    MatMenuTrigger,
    MatMenu,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatProgressSpinner,
    MatMenuContent,
    MatTooltip
  ],
  templateUrl: './film-list.html',
  styleUrl: './film-list.scss'
})
export class FilmList {
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private apiUrl = 'http://localhost:3000/films'
  menuTrigger = viewChild<MatMenuTrigger>('menuTrigger');
  readonly searchControl = new FormControl<string>('');
  readonly popularMovies = toSignal(this.http.get<Film[]>(this.apiUrl).pipe(
    catchError(() => {
      this.snackBar.open('Не удалось получить данные', 'Закрыть', {
        duration: 3000,
        verticalPosition: 'top'
      })
      return of([])
    }),
  ), {initialValue: []});
  readonly filteredMovies = linkedSignal({
    source: this.popularMovies,
    computation: (movies: Film[]) => {
      return movies;
    }
  });

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      tap((searchQuery) => {
        console.log(searchQuery);
        const query = searchQuery?.trim().toLowerCase() || '';
        this.filteredMovies.set(
          query
            ? this.popularMovies().filter(film =>
              film.title.toLowerCase().includes(query)
            )
            : this.popularMovies()
        );
      })
    ).subscribe()
  }

  onCloseMenuClick(): void {
    this.menuTrigger()?.closeMenu()
  }
}
