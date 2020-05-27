import { Pipe, PipeTransform } from '@angular/core';

enum OrderType {
  ASC = '+',
  DES = '-'
}

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  /**
   * Order list items by property name
   * @param items item list to order
   * @param compareProps an Array of properties to orderBy. Been the first char the `OrderType`
   * ### OrderType:
   * * `+` : Ascendant
   * * `-` : Descendant
   */
  public transform(items: any[], compareProps: string | string[]): any[] {

    // If no list or empty list -> return as it comes
    if (!items || !items.length) {
      return items;
    }

    // Order Ascendant OR Descendant (default ASC)
    switch (compareProps) {
      case OrderType.ASC:
        items.sort();
        break;
      case OrderType.DES:
        items.sort().reverse();
        break;
      default:
        items.sort();
        break;
    }

    // If it's an individual porpery, and isn't an Array -> convert to unique item Array(1)
    if (Array.isArray(compareProps) === false) {
      compareProps = [compareProps] as string[];
    }

    // As soon as a or b is smaller/greater than the other, we can immediately return
    return items.sort((a: any, b: any): number => {
      for (const fullProp of compareProps) {
        const reverse = fullProp[0] === OrderType.DES;
        const prop = fullProp.substr(1);

        // Is it a nested property?
        if (prop.indexOf('.') > 0) {
          let propA = a;
          let propB = b;

          prop.split('.').forEach(
            (propLevel) => {
              propA = propA[propLevel] || 0;
              propB = propB[propLevel] || 0;
            }
          );

          const result1 = OrderByPipe.compare(reverse, propA, propB);
          if (result1 !== 0) {
            return result1;
          }

          continue;
        }

        const result = OrderByPipe.compare(reverse, a[prop], b[prop]);
        if (result !== 0) {
          return result;
        }
      }

      return 0;
    });
  }

  public static compare(reverse: boolean, a: any, b: any): number {
    if (a < b && reverse === false) {
      return -1;
    }
    if (a > b && reverse === false) {
      return 1;
    }
    if (a < b && reverse === true) {
      return 1;
    }
    if (a > b && reverse === true) {
      return -1;
    }
    return 0;
  }
}
