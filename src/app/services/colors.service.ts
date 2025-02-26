import { Injectable, signal } from '@angular/core';

interface Color {
  name: string;
  hex: string;
  category: 'main' | 'state';
}

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor() { }

  #colors = signal<Color[]>([
    { name: 'primary', hex: '#48caff', category: 'main' },
    { name: 'secondary', hex: '#ff5722', category: 'main' },
    { name: 'success', hex: '#4caf50', category: 'state' },
    { name: 'warning', hex: '#ff9800', category: 'state' },
    { name: 'error', hex: '#f44336', category: 'state' }
  ]);

  getColors() {
    return this.#colors;
  }
}
