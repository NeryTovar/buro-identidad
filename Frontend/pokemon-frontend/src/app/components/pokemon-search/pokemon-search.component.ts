import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { ErrorComponent } from '../error/error.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-pokemon-search',
    templateUrl: './pokemon-search.component.html',
    styleUrls: ['./pokemon-search.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        PokemonDetailComponent,
        ErrorComponent
    ],
    standalone: true
})

export class PokemonSearchComponent {
    pokemonName: string = '';
    pokemon: Pokemon | null = null;
    error: string | null = null;
    loading: boolean = false;

    constructor(private pokemonService: PokemonService) {}

    searchPokemon() {
        if (!this.pokemonName.trim()) {
            this.error = 'Por favor, ingresa el nombre de un Pokémon';
            return;
        }
        this.loading = true;
        this.error = null;
        this.pokemon = null;

        this.pokemonService.getPokemon(this.pokemonName.toLowerCase()).subscribe({
            next: (data) => {
                this.pokemon = data;
                this.loading = false;
                this.saveToCache(data);
            },
            error: (err) => {
                this.error = err.message;
                this.loading = false;
            }
        });
    }

    private saveToCache(pokemon: Pokemon) {
        const cache = JSON.parse(localStorage.getItem('pokemonCache') || '[]');
        if (!cache.find((p: Pokemon) => p.name === pokemon.name)) {
            cache.push(pokemon);
            localStorage.setItem('pokemonCache', JSON.stringify(cache));
        }
    }
}