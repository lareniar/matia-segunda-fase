import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form-component';
import { HeaderComponent } from './components/header/header-component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'matia-segunda-fase';
}
