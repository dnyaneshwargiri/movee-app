import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from '../../services/movie.service';
import { SearchService } from '../../services/search.service';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Fix 1: Proper Constructor Mock
if (typeof window !== 'undefined') {
  (window as any).IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
}

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async () => {
    const mockMovieService = {
      // Fix 2: Change this to of([]) if your component expects an array!
      getMovies: vi.fn().mockReturnValue(of([])),
    };

    const mockSearchService = {
      searchQuery$: of(''),
      isSticky: vi.fn().mockReturnValue(false),
    };

    await TestBed.configureTestingModule({
      imports: [MovieListComponent],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: SearchService, useValue: mockSearchService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;

    // Safety: ensure movies is initialized if logic depends on it
    component.movies = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
