import { Component, inject, Input } from '@angular/core';
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
  imageError = false;
  accentColor: string = '';

  private palette = ['#FE797B', '#FFB750', '#90E969', '#36CEDC', '#A687CB'];
  private router = inject(Router);

  ngOnInit(): void {
    this.accentColor = this.palette[Math.floor(Math.random() * this.palette.length)];
  }

  get genres(): string[] {
    return this.movie.Genres.split(',').map((g) => g.trim());
  }

  goToDetail(): void {
    this.router.navigate(['/movie', encodeURIComponent(this.movie.Title)]);
  }

  onImageError(): void {
    this.imageError = true;
  }
}
