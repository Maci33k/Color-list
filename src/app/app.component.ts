import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorListComponent } from "./components/color-list/color-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColorListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ColorList';
}
