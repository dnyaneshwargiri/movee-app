import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  private movieService = inject(MovieService);

  movies: Movie[] = [];
  filtered: Movie[] = [];
  searchTerm = '';

  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.filtered = data;
      },
      error: (err) => console.error('Error loading movies', err),
    });
  }

  search() {
    this.filtered = this.movies.filter((m) =>
      m.Title.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
}
