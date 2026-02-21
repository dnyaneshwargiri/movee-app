import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { SearchService } from '../../services/search.service';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let searchService: SearchService;

  // Mock SearchService with required methods and a mock signal/value for isSticky
  const mockSearchService = {
    triggerSearch: vi.fn(),
    isSticky: vi.fn().mockReturnValue(false),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, SearchBoxComponent],
      providers: [{ provide: SearchService, useValue: mockSearchService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
    fixture.detectChanges();
  });

  it('should create the header', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo text', () => {
    const logo = fixture.debugElement.query(By.css('.logo')).nativeElement;
    expect(logo.textContent).toBe('moovee');
  });

  it('should call searchService.triggerSearch when onSearch is invoked', () => {
    const searchTerm = 'Interstellar';
    component.onSearch(searchTerm);
    expect(searchService.triggerSearch).toHaveBeenCalledWith(searchTerm);
  });

  it('should add "visible" class to search container when searchService.isSticky is true', () => {
    // Simulate sticky state being true
    mockSearchService.isSticky.mockReturnValue(true);
    fixture.detectChanges();

    const searchContainer = fixture.debugElement.query(By.css('.header-search'));
    expect(searchContainer.nativeElement.classList.contains('visible')).toBe(true);
  });

  it('should not have "visible" class when searchService.isSticky is false', () => {
    mockSearchService.isSticky.mockReturnValue(false);
    fixture.detectChanges();

    const searchContainer = fixture.debugElement.query(By.css('.header-search'));
    expect(searchContainer.nativeElement.classList.contains('visible')).toBe(false);
  });

  it('should render the avtar image with correct dimensions', () => {
    const img = fixture.debugElement.query(By.css('.emoji')).nativeElement;
    expect(img.getAttribute('width')).toBe('50');
    expect(img.getAttribute('height')).toBe('50');
    expect(img.getAttribute('src')).toBe('/assets/avatar.svg');
  });
});
