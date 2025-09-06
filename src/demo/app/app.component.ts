import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';

@Component({
  selector: 'amw-demo-root',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-material-wrap-demo';
}