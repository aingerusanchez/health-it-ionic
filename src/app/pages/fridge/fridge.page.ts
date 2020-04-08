import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService, StorageKey } from 'src/app/services/storage.service';
import { Food } from 'src/app/models/models-index';

@Component({
  selector: 'fridge',
  templateUrl: 'fridge.page.html',
  styleUrls: ['fridge.page.scss']
})
export class FridgePage implements OnInit {

  constructor(private storage: StorageService) { }

  public foodList: Food[] = [];
  public newFood = '';
  public newExpiration = null;

  async ngOnInit(): Promise<void> {
    this.foodList = await this.storage.getObject(StorageKey.FOOD_LIST) || [];
    console.log('Carga inicial de la lista de alimentos: ');
    console.table(this.foodList);
  }

  /** Add a new food to the `foodList` */
  public addNewFood() {
    if (this.newFood) {
      this.foodList.push({ name: this.newFood, expiration: this.newExpiration, amount: 1 });
      this.newFood = '';
      this.newExpiration = null;
      this.updateFoodList(this.foodList);
    }
  }

  /** Edit a food from `foodList` */
  public editFoodName(event: any, i: number) {
    const food = event.detail.value;
    if (food) {
      this.foodList[i] = { ...this.foodList[i], name: food.trim() };
      this.updateFoodList(this.foodList);
    }
  }

  public editFoodExpiration(event: any, i: number) {
    const foodExpiration = event.detail.value;
    if (foodExpiration) {
      this.foodList[i] = { ...this.foodList[i], expiration: foodExpiration };
      this.updateFoodList(this.foodList);
    }
  }

  public async setItemFocus(target: any) {
    setTimeout(() => {
      target.setFocus();
    }, 150);
  }

  /** Delete a food from `foodList` based on food index */
  public delete(foodIndex: number) {
    this.foodList.splice(foodIndex, 1);
    this.updateFoodList(this.foodList);
  }

  /** Delete a food expiration date */
  public freeze(foodIndex: number, slidingItem: any) {
    this.foodList[foodIndex].expiration = null;
    this.updateFoodList(this.foodList);
    slidingItem.close();
  }

  private updateFoodList(foodList: Food[]): void {
    this.foodList = this.sortByExpiration(foodList);
    this.storage.setObject(StorageKey.FOOD_LIST, foodList);
  }

  /** Decrement food amount -1 if it's greater than 1 */
  public decrement(food: Food, i: number) {
    if (food && i >= 0) {
      if (this.foodList[i].amount > 1) { this.foodList[i].amount--; }
      this.updateFoodList(this.foodList);
    }
  }

  /** Increment food amount +1 */
  public increment(food: Food, i: number) {
    if (food && i >= 0) {
      this.foodList[i].amount++;
      this.updateFoodList(this.foodList);
    }
  }

  private sortByExpiration(foodList: Food[]): Food[] {
    foodList.sort((a, b) => {
      // First sort null values
      if (a.expiration === null) {
        return 1;
      } else if (b.expiration === null) {
        return -1;
      }
      if (new Date(a.expiration).getTime() > new Date(b.expiration).getTime()) {
        return 1;
      }
      if (new Date(a.expiration).getTime() < new Date(b.expiration).getTime()) {
        return -1;
      }
      return 0;
    });
    return foodList;
  }

}
