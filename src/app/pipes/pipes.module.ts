import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// PIPES
import { CapitalizePipe } from './capitalize.pipe';

@NgModule({
  declarations: [
    CapitalizePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CapitalizePipe,
  ]
})
export class PipesModule { }
