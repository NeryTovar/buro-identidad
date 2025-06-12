import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonSearchComponent } from "./components/pokemon-search/pokemon-search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokemon-frontend';
}
