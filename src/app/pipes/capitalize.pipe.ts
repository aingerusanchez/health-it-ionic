import { Pipe, PipeTransform } from '@angular/core';

/*
 * Capitalize the first letter of the string
 * Takes a string as a value.
 * Usage:
 *  value | capitalizefirst
 * Example:
 *  // value.name = daniel
 *  {{ value.name | capitalizefirst  }}
 *  fromats to: Daniel
*/
@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) || '' : '';
  }

}
