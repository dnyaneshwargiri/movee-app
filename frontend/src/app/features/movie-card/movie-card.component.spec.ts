import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { Router } from '@angular/router';
import { Movie } from '../../types/movie';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let router: Router;

  const mockMovie: Movie = {
    Title: 'Inception',
    Year: 2010,
    Directors: 'Christopher Nolan',
    'Release Date': '2010-07-16',
    Rating: 8.8,
    Genres: 'Action, Sci-Fi, Adventure',
    'Image URL': 'http://example.com/inception.jpg',
    Plot: 'A thief who steals corporate secrets...',
    Rank: 1,
    'Running Time (secs)': 8880,
    Actors: 'Leonardo DiCaprio',
  };

  // Mock Router
  const mockRouter = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;

    // Set required input before detectChanges
    fixture.componentRef.setInput('movie', mockMovie);

    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pick a random accent color from the palette on init', () => {
    expect(component.accentColor).toMatch(/^#[0-9A-F]{6}$/i);
    const palette = ['#FE797B', '#FFB750', '#90E969', '#36CEDC', '#A687CB'];
    expect(palette).toContain(component.accentColor);
  });

  it('should correctly split genres into an array', () => {
    const genres = component.genres;
    expect(genres).toEqual(['Action', 'Sci-Fi', 'Adventure']);
    expect(genres.length).toBe(3);
  });

  it('should navigate to movie details with encoded title', () => {
    component.goToDetail();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movie', 'Inception']);
  });

  it('should set imageError to true when onImageError is called', () => {
    expect(component.imageError).toBe(false);
    component.onImageError();
    expect(component.imageError).toBe(true);
  });
});
