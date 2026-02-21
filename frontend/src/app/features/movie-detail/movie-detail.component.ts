import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  movie?: Movie | null;
  imageError = false;

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const subscription = this.route.paramMap.subscribe((params) => {
      const title = params.get('title');
      if (title) {
        this.fetchMovie(decodeURIComponent(title));
      }
    });
    this.subscriptions = [subscription];
  }

  fetchMovie(title: string): void {
    this.movie = null;
    this.imageError = false;

    const subscription = this.movieService.getMovieByTitle(title).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.movie = null;
        this.cdr.detectChanges();
      },
    });
    this.subscriptions.push(subscription);
  }

  get genres(): string[] {
    return this.movie?.Genres.split(',').map((g) => g.trim()) ?? [];
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onImageError(): void {
    this.imageError = true;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
