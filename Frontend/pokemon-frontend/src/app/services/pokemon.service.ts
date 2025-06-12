import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonService {
    private apiUrl = 'http://localhost:8080/pokemon';

    constructor(private http: HttpClient) {}

    getPokemon(name: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${this.apiUrl}/${name}`).pipe(
            catchError((error) => {
                return throwError(() => new Error('Pokémon no encontrado'));
            })
        );
    }
}