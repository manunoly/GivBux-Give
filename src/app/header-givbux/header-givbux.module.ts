import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderGivbuxComponent } from './header-givbux.component';



@NgModule({
  declarations: [
    HeaderGivbuxComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HeaderGivbuxComponent
  ]
  
})
export class HeaderGivbuxModule { }
