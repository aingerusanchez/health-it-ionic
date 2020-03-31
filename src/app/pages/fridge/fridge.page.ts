import { Component } from '@angular/core';

@Component({
  selector: 'fridge',
  templateUrl: 'fridge.page.html',
  styleUrls: ['fridge.page.scss']
})
export class FridgePage {

  public foodList = [
    {
      name: 'Pechugas',
      amount: 3
    },
    {
      name: 'Hamburguesas',
      amount: 2
    },
    {
      name: 'Pizza',
      amount: 2
    },
    {
      name: 'Lomo',
      amount: 4
    }
  ];
  public newFood = '';

  constructor() { }

  /** Add a new food to the `foodList` */
  public addNewFood() {
    if (this.newFood) {
      console.debug('LOG: FridgePage.addNewFood -> newFood', this.newFood);
      this.foodList.push({ name: this.newFood, amount: 1 });
      this.newFood = '';
    }
  }

  /** Delete a food from `foodList` based on food index */
  public consume(foodIndex: number) {
    console.debug('LOG: FridgePage -> consume -> foodIndex', foodIndex);
    this.foodList.splice(foodIndex, 1);
  }

}
