import { OnInit, Component, Input, OnChanges, HostBinding } from '@angular/core';
import { PlayerJSON } from '../../shared/game-state-json';

@Component({
  selector: 'app-player-stats-sidebar',
  templateUrl: './player-stats-sidebar.component.html',
  styleUrls: ['./player-stats-sidebar.component.scss'],
})
export class PlayerStatsSidebarComponent implements OnChanges {
  @Input() player: PlayerJSON;
  @Input() @HostBinding('class.right-align') rightAlign: boolean;

  constructor() { }

  ngOnChanges() { }
}
