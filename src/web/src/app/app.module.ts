import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HUDComponent } from './hud/hud.component';
import { HUDModule } from './hud/hud.module';
// import { PlayerSidebarComponent } from './player-sidebar/player-sidebar.component';
// import { WeaponComponent } from './weapon/weapon.component';
// import { HeaderModule } from './header/header.module';
// import { PhaseCountdownArea } from './header/phase-countdown-area/phase-countdown-area.component';

@NgModule({
  declarations: [
    AppComponent,
    HUDComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HUDModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
