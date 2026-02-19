import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;

  constructor(private router: Router) {}

  get genres(): string[] {
    return this.movie.Genres.split(',').map((g) => g.trim());
  }

  get ratingColor(): string {
    const rating = this.movie.Rating;

    if (rating >= 8) return '#f5c518'; // yellow
    if (rating >= 7) return '#4caf50'; // green
    if (rating >= 6) return '#03a9f4'; // blue
    return '#f44336'; // red
  }

  goToDetail(): void {
    this.router.navigate(['/movie', this.movie.Title]);
  }
}
