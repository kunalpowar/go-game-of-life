import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { GameStateJSON, PlayerJSON, PhaseCountdownsJSON, MapStateJSON } from '../shared/game-state-json';
import { GameState } from '../core/game-state';
import * as _ from 'lodash';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss']
})
export class HUDComponent implements OnChanges {
  @Input() state: GameStateJSON;

  player: PlayerJSON;
  teamAPlayers: PlayerJSON[] = [null, null, null, null, null];
  teamBPlayers: PlayerJSON[] = [null, null, null, null, null];

  gameState: GameState;
  phase: PhaseCountdownsJSON;

  teamASide: string;
  teamBSide: string;

  freezeTime: boolean;

  teamAMoney: number;
  teamAEquipment: number;
  teamBMoney: number;
  teamBEquipment: number;

  constructor() { }

  ngOnChanges() {
    if (!this.state) {
      return;
    }

    if (this.state.allplayers && this.state.allplayers.length > 0) {
      this.player = this.state.allplayers[0];
    }

    if (this.phase && this.state.phase_countdowns) {
      if (this.phase.phase !== 'freezetime' && this.state.phase_countdowns.phase === 'freezetime') {
        this.freezeTime = true;
        this.teamAMoney = 0;
        this.teamBMoney = 0;
        this.teamAEquipment = 0;
        this.teamBEquipment = 0;
      }
      if (this.phase.phase === 'freezetime' && this.state.phase_countdowns.phase !== 'freezetime') {
        setTimeout(() => {
          this.freezeTime = false;
        }, 6000);
      }
    }
    this.phase = this.state.phase_countdowns;


    this.gameState = new GameState();
    this.gameState.data = this.state;

    let teamA: PlayerJSON[];
    let teamB: PlayerJSON[];
    const cts = this.gameState.playersWithSide('CT');
    const ts = this.gameState.playersWithSide('T');
    if (this.state.map && this.state.map.round < 15) {
      teamA = cts;
      this.teamASide = 'CT';
      teamB = ts;
      this.teamBSide = 'T';
    } else {
      teamA = ts;
      this.teamASide = 'T';
      teamB = cts;
      this.teamBSide = 'CT';
    }

    let teamAMoney = 0;
    let teamAEquipment = 0;
    if (teamA && teamA.length > 0) {
      for (let i = 0; i < 5; i++) {
        if (teamA[i]) {
          this.teamAPlayers[i] = teamA[i];
          teamAMoney += teamA[i].state ? teamA[i].state.money : 0;
          teamAEquipment += teamA[i].state ? teamA[i].state.equip_value : 0;
        } else {
          this.teamAPlayers[i] = null;
        }
      }
    }
    this.teamAMoney = teamAMoney;
    this.teamAEquipment = teamAEquipment;

    let teamBMoney = 0;
    let teamBEquipment = 0;
    if (teamB && teamB.length > 0) {
      for (let i = 0; i < 5; i++) {
        if (teamB[i]) {
          this.teamBPlayers[i] = teamB[i];
          teamBMoney += (teamB[i].state ? teamB[i].state.money : 0);
          teamBEquipment += (teamB[i].state ? teamB[i].state.equip_value : 0);
        } else {
          this.teamBPlayers[i] = null;
        }
      }
    }
    this.teamBMoney = teamBMoney;
    this.teamBEquipment = teamBEquipment;
  }
}
