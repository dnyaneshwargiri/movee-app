import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  isSticky = signal(false);

  private searchSource = new Subject<string>();
  searchQuery$ = this.searchSource.asObservable();

  triggerSearch(query: string) {
    this.searchSource.next(query);
  }
}
