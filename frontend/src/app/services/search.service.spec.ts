import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService],
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default isSticky signal value of false', () => {
    // Accessing the signal value
    expect(service.isSticky()).toBe(false);
  });

  it('should update isSticky signal value', () => {
    service.isSticky.set(true);
    expect(service.isSticky()).toBe(true);
  });

  it('should emit the search query through searchQuery$ when triggerSearch is called', () => {
    const testQuery = 'Inception';
    let emittedQuery = '';

    // Subscribe to the observable to catch the emission
    service.searchQuery$.subscribe((query) => {
      emittedQuery = query;
    });

    service.triggerSearch(testQuery);

    expect(emittedQuery).toBe(testQuery);
  });

  it('should support multiple search triggers in sequence', () => {
    const queries = ['Interstellar', 'Batman', 'Dunkirk'];
    const results: string[] = [];

    service.searchQuery$.subscribe((q) => results.push(q));

    queries.forEach((q) => service.triggerSearch(q));

    expect(results).toEqual(queries);
  });
});
