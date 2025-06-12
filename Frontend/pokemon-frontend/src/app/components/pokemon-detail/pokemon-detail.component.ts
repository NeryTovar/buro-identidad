import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-pokemon-detail',
    templateUrl: './pokemon-detail.component.html',
    styleUrls: ['./pokemon-detail.component.scss'],
    imports: [CommonModule, MatCardModule],
    standalone: true
})
export class PokemonDetailComponent {
    @Input() pokemon!: Pokemon;
    safeImageUrl: SafeUrl;

    constructor(private sanitizer: DomSanitizer) {
        this.safeImageUrl = this.sanitizer.bypassSecurityTrustUrl('');
    }

    ngOnChanges() {
        if (this.pokemon?.imageBase64) {
            this.safeImageUrl = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64,${this.pokemon.imageBase64}`);
        }
    }
}