import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorByService {
    public colors: string[] = [
        '#ef5350',
        '#ec407a',
        '#ab47bc',
        '#7e57c2',
        '#5c6bc0',
        '#42a5f5',
        '#29b6f6',
        '#26c6da',
        '#26a69a',
        '#66bb6a',
        '#9ccc65',
        '#afb42b',
        '#fbc02d',
        '#fb8c00',
        '#f4511e',
        '#6d4c41',
        '#607d8b',
    ];

    selectedColors: { [key: string]: string } = {}

    constructor() {
    }

    public colorByString(str: string) {
        if (this.selectedColors[str]) {
            return this.selectedColors[str];
        }

        const index = this.randomInteger(0, this.colors.length - 1);

        return this.selectedColors[str] = this.colors.splice(index, 1)[0];
    }

    public randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
}
