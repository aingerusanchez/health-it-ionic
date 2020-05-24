import { Component, OnInit } from '@angular/core';
// SERVICES
import { StorageService, StorageKey } from 'src/app/services/storage.service';
// PIPES
import { FilterPipe } from 'src/app/pipes/filter.pipe';
// MODELS
import { Food } from 'src/app/models/models-index';

const EXP_WARNING = 3;

@Component({
  selector: 'fridge',
  templateUrl: 'fridge.page.html',
  styleUrls: ['fridge.page.scss'],
  providers: [FilterPipe]
})
export class FridgePage implements OnInit {

  constructor(
    private storage: StorageService,
    private filterPipe: FilterPipe,
  ) { }

  public foodList: Food[] = [];
  public newFood = '';
  public newExpiration = null;
  public newAmount = null;
  public minDate: string;
  public maxDate: string;
  public searchtext: string;

  async ngOnInit() {
    this.foodList = await this.getFoodList();
    console.log('Carga inicial de la lista de alimentos: ');
    console.table(this.foodList);
    this.minDate = this.getTodayISOString();
    this.maxDate = this.getMaxDateISOString();
  }

  private async getFoodList(): Promise<Food[]> {
    let storedFoodList: Food[] = await this.storage.getObject(StorageKey.FOOD_LIST) || [];
    if (storedFoodList.length) {
      storedFoodList = storedFoodList.map((food: Food) => new Food(food));
    }
    return storedFoodList;
  }

  /** Add a new food to the `foodList` */
  public createFood() {
    if (this.newFood) {
      this.foodList.push(new Food({ name: this.newFood, amount: this.newAmount, expiration: this.newExpiration }));
      this.newFood = '';
      this.newAmount = null;
      this.newExpiration = null;
      this.updateFoodList(this.foodList);
    }
  }

  /** Edit a food from `foodList` by ID */
  public editFoodName(event: any, foodID: number) {
    const foodName = event.detail.value;
    if (foodName) {
      const food = this.getFoodById(foodID);
      food.name = foodName; // = { ...this.foodList[i], name: food.trim() };
      this.updateFoodList(this.foodList);
    }
  }

  public editFoodExpiration(event: any, foodID: number) {
    const foodExpiration = event.detail.value;
    if (foodExpiration) {
      const food = this.getFoodById(foodID);
      food.expiration = foodExpiration;
      this.updateFoodList(this.foodList);
    }
  }

  public async setItemFocus(target: any) {
    setTimeout(() => {
      target.setFocus();
    }, 150);
  }

  /** Delete a food from `foodList` based on food ID */
  public delete(foodID: number): void {
    const foodIndex = this.foodList.findIndex((listFood: Food) => listFood.id === foodID);
    this.foodList.splice(foodIndex, 1);
    this.updateFoodList(this.foodList);
    this.searchtext = '';
    // this.filterPipe.transform(this.foodList, ['name'], this.searchtext);
  }

  /** Delete a food expiration date finded by food ID */
  public freeze(foodID: number, slidingItem: HTMLIonItemSlidingElement): void {
    const food = this.getFoodById(foodID);
    food.expiration = null;
    this.updateFoodList(this.foodList);
    slidingItem.close();
    this.searchtext = '';
    // this.filterPipe.transform(this.foodList, ['name'], this.searchtext);
  }

  private updateFoodList(foodList: Food[]): void {
    this.foodList = this.sortByExpiration(foodList);
    this.storage.setObject(StorageKey.FOOD_LIST, foodList);
  }

  /** Decrement food amount -1 if it's greater than 1 */
  public decrement(food: Food) {
    if (food && food.amount > 1) {
      food.amount--;
      this.updateFoodList(this.foodList);
    }
  }

  /** Increment food amount +1 */
  public increment(food: Food, i: number) {
    if (food) {
      food.amount++;
      this.updateFoodList(this.foodList);
    }
  }

  /** Return `Food` from `FoodList` by foodID */
  private getFoodById(foodID: number): Food {
    let food: Food;
    if (this.foodList.length) {
      food = this.foodList.find((listfood: Food) => listfood.id === foodID);
    }
    return food;
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

  /** Return current day in ISOString format */
  private getTodayISOString() {
    const today = new Date();
    return `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${(today.getDate()).toString().padStart(2, '0')}`;
  }

  /** Return current day 5 years from now in ISOString format */
  private getMaxDateISOString() {
    const today = new Date();
    return `${today.getFullYear() + 5}-${('0' + (today.getMonth() + 1)).slice(-2)}-${(today.getDate()).toString().padStart(2, '0')}`;
  }

  /**
   * Return a class depending on the days left for expiration
   * @param expDate expiration date
   * @returns `expClass` color class name that represent the closeness to expiration date
   */
  public getExpirationClass(expDate: Date): string {
    const date = new Date(expDate);
    let expClass = 'frozen';
    if (expDate) {
      const difference = this.daysToExpire(date);
      // console.log('LOG: FridgePage -> difference', difference);
      if (difference < 0) {
        expClass = 'expired';
      } else if (difference === 0) {
        expClass = 'danger';
      } else if (0 < difference && difference < EXP_WARNING + 1) {
        expClass = 'warning';
      } else {
        expClass = 'success';
      }
    }
    return expClass;
  }

  /**
   * Calculate the days left to expire
   * @param expDate expiration date
   * @return the number of days left to expire rounded
   */
  private daysToExpire(expDate: Date): number {
    const date = new Date(expDate);
    // TODO: revisar antes valor en los cambios de día
    return Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  }

}
