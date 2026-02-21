import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { describe, it, expect, beforeEach } from 'vitest';
import { By } from '@angular/platform-browser';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the spinner component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the default size of 50px', () => {
    const spinnerElement = fixture.debugElement.query(By.css('.spinner')).nativeElement;

    expect(spinnerElement.style.width).toBe('50px');
    expect(spinnerElement.style.height).toBe('50px');
  });

  it('should update dimensions when size input changes', () => {
    const newSize = 80;

    // Set the input property
    fixture.componentRef.setInput('size', newSize);
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('.spinner')).nativeElement;

    expect(spinnerElement.style.width).toBe(`${newSize}px`);
    expect(spinnerElement.style.height).toBe(`${newSize}px`);
  });

  it('should have the spinner class', () => {
    const spinnerElement = fixture.debugElement.query(By.css('.spinner'));
    expect(spinnerElement).not.toBeNull();
  });
});
