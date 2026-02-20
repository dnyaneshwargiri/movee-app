import { Component, inject } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { Movie } from '../../types/movie';
import { SearchBoxComponent } from '../search-box/search-box.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBoxComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public searchService = inject(SearchService);
  private movieService = inject(MovieService);
  private subscriptions: Subscription[] = [];
  movies: Movie[] = [];
  page = 1;
  pageSize = 20;
  loading = false;
  hasMore = true;

  onSearch(query: string) {
    if (!query.trim()) return;
    // @TODO: Need to invoke same search logic here as from movie list component
    // const subscription = this.movieService.getMovies(this.page, this.pageSize, query).subscribe({
    //   next: (response) => {
    //     if (response.length < this.pageSize) {
    //       this.hasMore = false;
    //     }
    //     this.movies = [...this.movies, ...response];
    //     this.page++;
    //     this.loading = false;
    //   },
    //   error: (err) => {
    //     console.error(err);
    //     this.loading = false;
    //   },
    // });

    // this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
