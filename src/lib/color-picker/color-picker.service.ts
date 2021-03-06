import { Injectable, Inject } from '@angular/core';
import { coerceHexaColor, isValidColor, EMPTY_COLOR } from './color-picker';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MccColorPickerService {
  /**
   * Array of all used colors
   */
  private _colors: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(@Inject(EMPTY_COLOR) private emptyColor: string) {}

  /**
   * Add new color to used colors
   * @param color string
   */
  addColor(color: string): void {
    if (!color || !isValidColor(color)) {
      return;
    }

    color = coerceHexaColor(color) || this.emptyColor;

    const colors = this._colors.getValue();
    if (!colors.find(_color => _color === color)) {
      colors.push(color);
      this._colors.next(colors);
    }
  }

  /**
   * Return Observable of colors
   */
  getColors(): Observable<string[]> {
    return this._colors.asObservable();
  }
}
