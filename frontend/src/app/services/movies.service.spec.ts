import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { Movie } from '../types/movie';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  const mockMovies: Movie[] = [
    {
      Title: 'Inception',
      Year: 2010,
      Directors: 'Christopher Nolan',
      'Release Date': '2010-07-16',
      Rating: 8.8,
      Genres: 'Action, Sci-Fi',
      'Image URL': 'http://example.com/inception.jpg',
      Plot: 'A thief who steals corporate secrets...',
      Rank: 1,
      'Running Time (secs)': 8880,
      Actors: 'Leonardo DiCaprio',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch movies with pagination parameters', () => {
    const page = 1;
    const limit = 10;

    service.getMovies(page, limit).subscribe((movies) => {
      expect(movies[0].Title).toBe('Inception');
      expect(typeof movies[0].Year).toBe('number');
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/movies?_page=${page}&_limit=${limit}&_sort=Year&_order=desc`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should filter by Title_like when search term is provided', () => {
    const search = 'Inception';
    service.getMovies(1, 10, search).subscribe();

    const req = httpMock.expectOne((request) =>
      request.urlWithParams.includes(`Title_like=${search}`),
    );
    req.flush(mockMovies);
  });

  it('should return a single movie object by title using params', () => {
    const title = 'Inception';

    service.getMovieByTitle(title).subscribe((movie) => {
      expect(movie).not.toBeNull();
      expect(movie?.Title).toBe(title);
      expect(movie?.['Running Time (secs)']).toBe(8880);
    });

    const req = httpMock.expectOne(
      (request) =>
        request.url === 'http://localhost:3000/movies' && request.params.get('Title') === title,
    );

    req.flush(mockMovies);
  });

  it('should return null when the API returns an empty array for a title search', () => {
    service.getMovieByTitle('NonExistent').subscribe((movie) => {
      expect(movie).toBeNull();
    });

    const req = httpMock.expectOne((r) => r.url === 'http://localhost:3000/movies');
    req.flush([]);
  });
});
