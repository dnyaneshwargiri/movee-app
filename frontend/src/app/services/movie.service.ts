import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Movie } from '../types/movie';

export interface PaginatedMovies {
  data: Movie[];
  total: number;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/movies';

  getMovies(page: number, limit: number, search: string = '') {
    let url = `http://localhost:3000/movies?_page=${page}&_limit=${limit}&_sort=Year&_order=desc`;
    if (search) {
      url += `&Title_like=${search}`;
    }
    return this.http.get<Movie[]>(url);
  }

  getMovieByTitle(title: string): Observable<Movie | null> {
    const params = new HttpParams().set('Title', title);

    return this.http
      .get<Movie[]>(this.baseUrl, { params })
      .pipe(map((movies) => movies[0] ?? null));
  }

  
}
