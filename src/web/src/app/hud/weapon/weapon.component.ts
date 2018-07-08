import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { WeaponJSON } from '../../shared/game-state-json';

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon.component.html',
  styleUrls: ['./weapon.component.scss']
})
export class WeaponComponent {
  @Input() weapon: WeaponJSON;
  @Input() flip: boolean;

  constructor() { }
}
