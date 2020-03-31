import { Component } from '@angular/core';

export enum TabRef {
  NEVERA = 'NEVERA'
}

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public readonly TabRef = TabRef;

  constructor() {}

}
