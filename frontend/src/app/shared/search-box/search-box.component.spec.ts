import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBoxComponent } from './search-box.component';
import { SearchService } from '../../services/search.service';
import { FormsModule } from '@angular/forms';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let mockSearchService: any;

  beforeEach(async () => {
    // 1. Enable Vitest Fake Timers
    vi.useFakeTimers();

    mockSearchService = { triggerSearch: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [SearchBoxComponent, FormsModule],
      providers: [{ provide: SearchService, useValue: mockSearchService }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // 2. Restore timers after each test
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should trigger search service after 1000ms debounce', async () => {
    component.searchTerm = 'Interstellar';
    component.onInputChange();

    // Fast-forward 500ms
    await vi.advanceTimersByTimeAsync(500);
    expect(mockSearchService.triggerSearch).not.toHaveBeenCalled();

    // Fast-forward remaining 500ms
    await vi.advanceTimersByTimeAsync(500);
    expect(mockSearchService.triggerSearch).toHaveBeenCalledWith('Interstellar');
  });
});
