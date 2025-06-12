import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    imports: [CommonModule, MatCardModule],
    standalone: true
})
export class ErrorComponent {
    @Input() message: string = '';
}