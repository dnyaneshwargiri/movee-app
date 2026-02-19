import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Movie } from '../types/movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/movies';

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(this.baseUrl)
      .pipe(map((movies) => movies.sort((a, b) => b.Year - a.Year)));
  }

  getMovieByTitle(title: string): Observable<Movie | undefined> {
    return this.getMovies().pipe(map((movies) => movies.find((m) => m.Title === title)));
  }
}
