import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NewHeaderGivbuxComponent } from './new-header-givbux/new-header-givbux.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule],
  declarations: [NewHeaderGivbuxComponent],
  exports: [NewHeaderGivbuxComponent],
  entryComponents: [NewHeaderGivbuxComponent],
})
export class SharedModule {}
