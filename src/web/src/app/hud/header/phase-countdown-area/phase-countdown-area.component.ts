import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PhaseCountdownsJSON, PlayerJSON, WeaponJSON, MapStateJSON, RoundStateJSON } from '../../../shared/game-state-json';
import { tick } from '@angular/core/testing';

const validPhases = ['live', 'freezetime', 'bomb', 'defuse', 'timeout_t', 'timeout_ct'];

@Component({
  selector: 'app-phase-countdown-area',
  templateUrl: './phase-countdown-area.component.html',
  styleUrls: ['./phase-countdown-area.component.scss'],
  animations: [
    trigger('c4Planted', [
      transition('void => *', [
        animate('40s 0s linear', style({ transform: 'translateY(-100%)' }))
      ]),
      transition('* => void', [
        animate(0, style({ transform: 'translateY(0%)' }))
      ])
    ]),
    trigger('defusing', [
      state('slow', style({
        transform: 'translateX(0%)'
      })),
      state('fast', style({
        transform: 'translateX(0%)'
      })),
      state('not', style({
        transform: 'translateX(-100%)'
      })),
      transition('void => slow', animate('10s linear')),
      transition('void => fast', animate('5s linear')),
      transition('* => slow', animate('10s linear')),
      transition('* => fast', animate('5s linear')),
      transition('* => not', animate('0s linear')),
    ])
  ]
})
export class PhaseCountdownAreaComponent implements OnInit, OnChanges {
  @Input() phase: PhaseCountdownsJSON;
  @Input() mapState: MapStateJSON;
  @Input() roundState: RoundStateJSON;

  phaseName: string;

  endsIn: string;
  runningOut: boolean;

  defuseTime = 0;
  defuseState = 'not';
  defused: boolean;

  constructor() {
  }

  ngOnChanges() {
    if (this.phase && this.phase.phase_ends_in !== '') {
      if (this.roundState && this.roundState.bomb === 'defused') {
        this.defused = true;
      }

      if (validPhases.indexOf(this.phase.phase) < 0) {
        return;
      }
      this.phaseName = this.phase.phase;

      if (this.phaseName === 'live' || this.phaseName === 'freezetime') {
        this.defuseTime = 0;
        this.defuseState = 'not';
        this.defused = false;

        const seconds = Number(parseFloat(this.phase.phase_ends_in).toFixed());
        if (seconds < 0) {
          return;
        }

        this.endsIn = this.secondsToDuration(seconds);
      } else if (this.phaseName === 'defuse') {
        if (this.defuseTime === 0) {
          this.defuseTime = parseFloat(this.phase.phase_ends_in);
          console.log(`defuseTime: ${this.defuseTime}`);
          if (this.defuseTime <= 6) {
            this.defuseState = 'fast';
          } else {
            this.defuseState = 'slow';
          }
        }
      }
    }
  }

  secondsToDuration(seconds: number) {
    if (seconds < 10) {
      this.runningOut = true;
      return '0:0' + seconds;
    }
    this.runningOut = false;

    if (seconds < 60) {
      return '0:' + seconds;
    }

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (secs < 10) {
      return mins.toString() + ':0' + secs.toString();
    }
    return mins.toString() + ':' + secs.toString();
  }

  ngOnInit() {
  }
}
