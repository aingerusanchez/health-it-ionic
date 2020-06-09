import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoplistPage } from './shoplist.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ShoplistPage }]),
  ],
  declarations: [ShoplistPage]
})
export class ShoplistPageModule {}
