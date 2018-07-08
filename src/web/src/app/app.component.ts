import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './core/data.service';
import { Subscription } from 'rxjs/Subscription';
import { JsonPipe } from '@angular/common';
import { GameStateJSON } from './shared/game-state-json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  sub: Subscription;
  state: GameStateJSON;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.connectToSocket();

    this.sub = this.dataService.getStateObservable()
      .subscribe(state => {
        if (state['player']) {

          const allplayersObj = state['allplayers'];
          const playersArray = [];
          if (allplayersObj) {
            const steamIDs = Object.keys(allplayersObj);
            steamIDs.forEach(steamID => {
              const playerObj = allplayersObj[steamID];
              playerObj['steamid'] = steamID;

              const weaponsObj = playerObj['weapons'];
              const weaponsArray = [];
              if (weaponsObj) {
                const weaponIDs = Object.keys(weaponsObj);
                weaponIDs.forEach(weaponID => {
                  weaponsArray.push(weaponsObj[weaponID]);
                });
              }
              playerObj['weapons'] = weaponsArray;

              playersArray.push(playerObj);
            });
            state['allplayers'] = playersArray;
          }

          this.state = <GameStateJSON>state;
        }
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
