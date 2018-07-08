import { Component, OnInit, Input, HostBinding, OnChanges } from '@angular/core';
import { GameStateJSON, PlayerJSON } from '../../shared/game-state-json';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
  // host: { '[class.right-align]': 'rightAlign' }
})
export class EquipmentComponent {
  @Input() @HostBinding('class.right-align') rightAlign: boolean;

  @Input() money: number;
  @Input() equipment: number;
  @Input() side: string;

  constructor() { }
}

