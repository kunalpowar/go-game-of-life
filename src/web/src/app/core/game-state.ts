import { Injectable, OnInit } from "@angular/core";
import * as _ from 'lodash';
import { GameStateJSON, PlayerJSON } from "../shared/game-state-json";

@Injectable()
export class GameState implements OnInit {
  data: GameStateJSON

  playersWithSide(side: string): PlayerJSON[] {
    if (!this.data.allplayers) {
      return null
    }

    let ps = [];
    this.data.allplayers.forEach(p => {
      if (p.team == side) {
        ps.push(p);
      }
    })

    ps = _.sortBy(ps, 'observer_slot');

    return ps;
  }

  teamMoney(side: string): number {
    let players = this.playersWithSide(side);
    let money = 0;
    players.forEach(p => {
      money += p.state.money;
    });
    return money;
  }

  teamEquipmentValue(side: string): number {
    let players = this.playersWithSide(side);
    let equip = 0;
    players.forEach(p => {
      equip += p.state.equip_value;
    });
    return equip;
  }

  constructor() { }

  ngOnInit() { }
}













