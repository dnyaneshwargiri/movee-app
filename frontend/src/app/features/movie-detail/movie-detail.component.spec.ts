import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of, throwError, BehaviorSubject } from 'rxjs';
import { Movie } from '../../types/movie';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let movieService: MovieService;
  let router: Router;

  // Mock Data
  const mockMovie: Movie = {
    Title: 'Inception',
    Year: 2010,
    Directors: 'Christopher Nolan',
    'Release Date': '2010-07-16',
    Rating: 8.8,
    Genres: 'Action, Sci-Fi',
    'Image URL': 'http://example.com/img.jpg',
    Plot: 'Dream thief...',
    Rank: 1,
    'Running Time (secs)': 8880,
    Actors: 'DiCaprio',
  };

  // Mock ActivatedRoute with a Subject to simulate param changes
  const paramMapSubject = new BehaviorSubject(convertToParamMap({ title: 'Inception' }));

  const mockMovieService = {
    getMovieByTitle: vi.fn(),
  };

  const mockRouter = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: paramMapSubject.asObservable() },
        },
      ],
    }).compileComponents();

    movieService = TestBed.inject(MovieService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie on init based on route params', () => {
    mockMovieService.getMovieByTitle.mockReturnValue(of(mockMovie));

    fixture.detectChanges(); // triggers ngOnInit

    expect(mockMovieService.getMovieByTitle).toHaveBeenCalledWith('Inception');
    expect(component.movie).toEqual(mockMovie);
  });

  it('should correctly format genres array', () => {
    mockMovieService.getMovieByTitle.mockReturnValue(of(mockMovie));
    fixture.detectChanges();

    expect(component.genres).toEqual(['Action', 'Sci-Fi']);
  });

  it('should handle error when movie fetch fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockMovieService.getMovieByTitle.mockReturnValue(throwError(() => new Error('API Error')));

    component.fetchMovie('Inception');
    fixture.detectChanges();

    expect(component.movie).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should navigate back to home when goBack is called', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle image error', () => {
    expect(component.imageError).toBe(false);
    component.onImageError();
    expect(component.imageError).toBe(true);
  });

  it('should cleanup subscriptions on destroy', () => {
    fixture.detectChanges();
    const unsubscribeSpy = vi.spyOn(component['subscriptions'][0], 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
