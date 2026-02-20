import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../types/movie';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from '../../shared/search-box/search-box.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, FormsModule, SearchBoxComponent],
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

  ngOnInit(): void {
    this.loadMovies();
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
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
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

  onSearch(term: string): void {
    this.searchTerm = term;
    this.page = 1;
    this.movies = [];
    this.hasMore = true;
    this.loadMovies();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
