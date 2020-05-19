import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// PIPES
import { CapitalizePipe } from './capitalize.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
    FilterPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CapitalizePipe,
    FilterPipe,
  ]
})
export class PipesModule { }
