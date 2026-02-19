import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private router = inject(Router);

  movie?: Movie;

  ngOnInit() {
    const title = this.route.snapshot.paramMap.get('title');

    if (title) {
      this.movieService.getMovieByTitle(title).subscribe({
        next: movie => (this.movie = movie),
        error: err => console.error(err)
      });
    }
  }

  get genres(): string[] {
    return this.movie?.Genres.split(',').map(g => g.trim()) ?? [];
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
