import { Component, OnInit, Input, OnChanges, HostBinding } from '@angular/core';
import { PlayerJSON, PhaseCountdownsJSON, WeaponJSON } from './../../shared/game-state-json';

@Component({
  selector: 'app-player-sidebar',
  templateUrl: './player-sidebar.component.html',
  styleUrls: ['./player-sidebar.component.scss'],
})
export class PlayerSidebarComponent implements OnChanges {
  @Input() player: PlayerJSON;
  @Input() @HostBinding('class.right-align') rightAlign: boolean;

  primaryWeapon: WeaponJSON;
  secondaryWeapon: WeaponJSON;
  nades: WeaponJSON[];
  activeWeapon: WeaponJSON;

  prevHealth: number;
  delayedHealth: number;
  damaged: boolean;

  hasArmor: boolean;
  armorWithHelmet: boolean;

  hasC4: boolean;
  hasDefuseKit: boolean;

  prevPhase: string;
  showKAD: boolean;

  constructor() {
    console.log('PLAYER constructed');
  }


  primaryWeapons = [
    'weapon_ak47',
    'weapon_awp',
    'weapon_famas',
    'weapon_galilar',
    'weapon_m4a1_silencer',
    'weapon_m4a1',
    'weapon_ump45',
    'weapon_taser',
    'weapon_sawedoff',
    'weapon_aug',
    'weapon_mac10',
    'weapon_mp7',
    'weapon_mp9',
    'weapon_p90',
    'weapon_ssg08',
    'weapon_bizon',
    'weapon_m249',
    'weapon_negev',
  ];
  secondaryWeapons = [
    'weapon_usp_silencer',
    'weapon_cz75a',
    'weapon_deagle',
    'weapon_elite',
    'weapon_fiveseven',
    'weapon_glock',
    'weapon_tec9',
    'weapon_p250',
    'weapon_hkp2000',
  ];
  nadeNames = ['weapon_smokegrenade', 'weapon_molotov', 'weapon_hegrenade', 'weapon_flashbang', 'weapon_decoy'];

  ngOnChanges() {
    this.hasC4 = false;
    const nades = [];
    let primaryWeapon: WeaponJSON;
    let secondaryWeapon: WeaponJSON;
    if (this.player && this.player.weapons) {
      this.player.weapons.forEach(w => {
        if (w.state === 'active') {
          this.activeWeapon = w;
        }
        if (w.name === 'weapon_c4') {
          this.hasC4 = true;
        }
        if (this.nadeNames.indexOf(w.name) > -1) {
          const count = w.ammo_reserve;
          if (w.name === 'weapon_molotov') {
            w.name = 'weapon_molotov_' + this.player.team.toLowerCase();
          }
          for (let i = 0; i < count; i++) {
            nades.push(w);
          }
        }
        if (this.primaryWeapons.indexOf(w.name) > -1) {
          primaryWeapon = w;
        }
        if (this.secondaryWeapons.indexOf(w.name) > -1) {
          secondaryWeapon = w;
        }
      });
      this.nades = nades;
      this.primaryWeapon = primaryWeapon;
      this.secondaryWeapon = secondaryWeapon;
    }

    if (this.player && this.player.state) {
      this.hasDefuseKit = this.player.state.defusekit;
      if (this.prevHealth !== this.player.state.health) {
        if (this.player.state.health < this.prevHealth) {
          this.damaged = true;
          setTimeout(() => {
            this.delayedHealth = this.player.state.health;
            this.damaged = false;
          }, 1500);
        } else {
          this.delayedHealth = this.player.state.health;
        }
        this.prevHealth = this.player.state.health;
      }

      this.hasArmor = false;
      this.armorWithHelmet = false;
      if (this.player.state.armor > 0) {
        this.hasArmor = true;
        this.armorWithHelmet = this.player.state.helmet;
      }
    }

  }
}
