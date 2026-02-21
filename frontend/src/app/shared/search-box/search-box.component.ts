import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SpinnerComponent } from '../../core/spinner/spinner.component';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
})
export class SearchBoxComponent implements OnDestroy {
  searchTerm = '';
  isSearching = false;
  @Input() showSpinner: boolean = true;
  private searchService = inject(SearchService);
  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;

  constructor() {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((term) => {
        this.isSearching = false;
        this.searchService.triggerSearch(term);
      });
  }

  onInputChange(): void {
    this.isSearching = true;
    this.searchSubject.next(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.isSearching = false;
    this.searchService.triggerSearch('');
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
