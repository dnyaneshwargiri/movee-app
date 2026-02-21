import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../types/movie';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SearchBoxComponent } from '../../shared/search-box/search-box.component';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { SpinnerComponent } from '../../core/spinner/spinner.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, FormsModule, SearchBoxComponent, SpinnerComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  page = 1;
  pageSize = 20;
  loading = false;
  hasMore = true;
  searchTerm = '';
  private subscriptions: Subscription[] = [];
  private movieService = inject(MovieService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  searchService = inject(SearchService);
  @ViewChild('searchSentinel') sentinel!: ElementRef;

  ngOnInit(): void {
    this.loadMovies();

    const searchSub = this.searchService.searchQuery$
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((term) => {
        this.performSearch(term);
      });

    this.subscriptions.push(searchSub);
  }

  loadMovies(): void {
    if (this.loading || !this.hasMore) return;
    this.loading = true;

    const subscriptions = this.movieService
      .getMovies(this.page, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response) => {
          if (response.length < this.pageSize) {
            this.hasMore = false;
          }

          this.movies = [...this.movies, ...response];
          this.page++;
          this.loading = false;
          this.cdr.markForCheck();
          if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => this.cdr.detectChanges(), 0);
          }
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          this.cdr.detectChanges();
        },
      });

    this.subscriptions.push(subscriptions);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const threshold = 300;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    if (position >= height - threshold) {
      this.loadMovies();
    }
  }

  private performSearch(term: string): void {
    this.searchTerm = term;
    this.movies = [];
    this.page = 1;
    this.hasMore = true;
    this.loadMovies();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        this.searchService.isSticky.set(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(this.sentinel.nativeElement);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
