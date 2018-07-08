import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GameStateJSON, PhaseCountdownsJSON, MapStateJSON, RoundStateJSON } from '../../shared/game-state-json';
import { DataService } from '../../core/data.service';
import { TeamConfigJSON } from '../../shared/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnChanges {
  @Input() state: GameStateJSON;
  @Input() teamASide: string;
  @Input() teamBSide: string;

  phase: PhaseCountdownsJSON;
  mapState: MapStateJSON;

  teamA: TeamConfigJSON;
  teamB: TeamConfigJSON;
  teamAScore = 0;
  teamBScore = 0;

  roundState: RoundStateJSON;

  constructor(private dataService: DataService) { }

  ngOnChanges() {
    if (this.state) {
      if (this.state.phase_countdowns) {
        this.phase = this.state.phase_countdowns;
      }
      if (this.state.map) {
        this.mapState = this.state.map;

        if (this.state.map.round < 15) {
          this.teamAScore = this.state.map.team_ct ? this.state.map.team_ct.score : 0;
          this.teamBScore = this.state.map.team_t ? this.state.map.team_t.score : 0;
        } else {
          this.teamAScore = this.state.map.team_t ? this.state.map.team_t.score : 0;
          this.teamBScore = this.state.map.team_ct ? this.state.map.team_ct.score : 0;
        }
      }

      this.roundState = this.state.round;
    }

    this.teamA = this.dataService.config ? this.dataService.config.teamA : { name: 'TBD' };
    this.teamB = this.dataService.config ? this.dataService.config.teamB : { name: 'TBD' };
  }
}
