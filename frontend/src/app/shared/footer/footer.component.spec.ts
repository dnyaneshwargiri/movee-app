import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { describe, it, expect, beforeEach } from 'vitest';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the three main columns', () => {
    const columns = fixture.debugElement.queryAll(By.css('.column'));
    expect(columns.length).toBe(3);
  });

  it('should display the correct section headers', () => {
    const headers = fixture.debugElement.queryAll(By.css('h3'));
    const headerTexts = headers.map((h) => h.nativeElement.textContent);

    expect(headerTexts).toContain('Help');
    expect(headerTexts).toContain('Legal stuff');
    expect(headerTexts).toContain('Follow us');
  });

  it('should contain the divider and accent elements', () => {
    const divider = fixture.debugElement.query(By.css('.divider'));
    const accent = fixture.debugElement.query(By.css('.right-accent'));

    expect(divider).not.toBeNull();
    expect(accent).not.toBeNull();
  });

  it('should render specific legal links', () => {
    const footerElement: HTMLElement = fixture.nativeElement;
    expect(footerElement.textContent).toContain('Privacy policy');
    expect(footerElement.textContent).toContain('Cookie policy');
  });
});
