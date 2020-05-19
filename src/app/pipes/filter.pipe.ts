import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor() { }

  /**
   * Filter an array based on list items fields
   * @use items | filterBy: [<field1>, <field2>, ...]: <value>
   * @param items List items
   * @param fields Fields for filter list
   * @param value Fields value
   */
  public transform(items: any[], fields: string[], value: string): any[] {
    let searchValue: string;
    // If no items, return empty array
    if (!items) {
      return [];
    }

    if (!value) { // If no search value, return whole array
      return items;
    } else { // Normalize search value
      searchValue = this.normalizeString(value);
      // DEBUG: show search text: console.debug('SCOUTING: FilterByPipe -> searchValue', searchValue);
    }

    const resultArray: any[] = [];
    let added: boolean;
    // Iterates over all items and return those who includes  the condition
    items.filter(item => {
      added = false;
      // If only compares with one field
      if (typeof fields === 'string') {
        const compareValue = this.normalizeString(this.getPropertyValue(item, fields));
        if (compareValue.includes(searchValue) && (!resultArray.length || !added)) {
          added = true;
          resultArray.push(item);
        }
      } else {
        // For multiple field comparison
        fields.forEach((field: string) => {
          const compareValue = this.normalizeString(this.getPropertyValue(item, field));
          if (compareValue.includes(searchValue) && (!resultArray.length || !added)) {
            added = true;
            resultArray.push(item);
          }
        });
      }
    });
    // console.debug(resultArray);
    return resultArray;
  }

  /**  Returns item property value, even if it's a nested property */
  private getPropertyValue(item: any, prop: string): string {
    if (prop.includes('.')) {
      prop.split('.').forEach(
        (subProperty) => {
          item = item[subProperty];
        }
      );
    } else {
      item = item[prop];
    }
    return item;
  }

  /** Returns normalized string changing special characters (except 'ñ'), convert to lowercase and trim
   * @param value text to normalize
   * @param isSpanish (default TRUE) IF TRUE: avoid replacing `ñ` char
   * @see https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos
   */
  private normalizeString(value: string, isSpanish = true) {
    if (value) {
      if (isSpanish) {
        return value.toLowerCase()
          .normalize('NFD')
          .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, '$1')
          .normalize()
          .trim();
      } else {
        return value.toLowerCase()
          .normalize('NFD')
          .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, '$1$2')
          .normalize()
          .trim();
      }
    }
  }

}
