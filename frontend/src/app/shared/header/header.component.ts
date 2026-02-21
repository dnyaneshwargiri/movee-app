import { Component, inject } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { Movie } from '../../types/movie';
import { SearchBoxComponent } from '../search-box/search-box.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [SearchBoxComponent],
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public searchService = inject(SearchService);
  private subscriptions: Subscription[] = [];

  onSearch(term: string): void {
    this.searchService.triggerSearch(term);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
