import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DemoNavigationComponent } from './components/demo-navigation/demo-navigation.component';

@Component({
  selector: 'amw-demo-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DemoNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-material-wrap-demo';
}