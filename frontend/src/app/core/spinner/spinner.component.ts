import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `<div class="spinner" [style.width.px]="size" [style.height.px]="size"></div>`,
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  @Input() size = 50;
}
