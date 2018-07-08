import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PhaseCountdownAreaComponent } from './phase-countdown-area/phase-countdown-area.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    PhaseCountdownAreaComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [],
  bootstrap: []
})
export class HeaderModule { }
