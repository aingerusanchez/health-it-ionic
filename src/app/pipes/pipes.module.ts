import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// PIPES
import { CapitalizePipe } from './capitalize.pipe';
import { FilterPipe } from './filter.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    FilterPipe,
    OrderByPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CapitalizePipe,
    FilterPipe,
    OrderByPipe,
  ]
})
export class PipesModule { }
