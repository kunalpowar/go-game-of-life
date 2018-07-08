import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeaponComponent } from './weapon/weapon.component';
import { PlayerSidebarComponent } from './player-sidebar/player-sidebar.component';
import { HeaderModule } from './header/header.module';
import { HeaderComponent } from './header/header.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { PlayerStatsSidebarComponent } from './player-stats-sidebar/player-stats-sidebar.component';


@NgModule({
  declarations: [
    WeaponComponent,
    PlayerSidebarComponent,
    EquipmentComponent,
    PlayerSidebarComponent,
    PlayerStatsSidebarComponent,
  ],
  imports: [
    CommonModule,
    HeaderModule,
  ],
  exports: [
    HeaderComponent,
    PlayerSidebarComponent,
    EquipmentComponent,
    PlayerStatsSidebarComponent,
  ],
  providers: [],
  bootstrap: []
})

export class HUDModule { }
