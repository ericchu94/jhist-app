import { Component } from '@angular/core';

import { Player } from './player';
import { PlayerService } from './player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private playersDict: {[id: number]: Player} = {};
  players: Player[] = [];
  newPlayerName: string = '';

  constructor(private playerService: PlayerService) {
    this.playerService.on('getPlayers', players => this.updatePlayers(players));
    this.playerService.on('postPlayer', player => this.updatePlayer(player));
    this.playerService.on('getPlayer', player => this.updatePlayer(player));
    this.playerService.on('putPlayer', player => this.updatePlayer(player));
    this.playerService.on('deletePlayer', player => this.deletePlayer(player.id));
  }

  private deletePlayer(id: number): void {
    const player = this.playersDict[id];
    this.players.splice(this.players.indexOf(player), 1);
    delete this.playersDict[id];
  }

  updatePlayer(player: Player): void {
    if (!this.playersDict[player.id]) {
      this.playersDict[player.id] = player;
      this.players.push(player);
      return;
    }

    this.playersDict[player.id].name = player.name;
    this.playersDict[player.id].score = player.score;
  }

  updatePlayers(players: Player[]): void {
    for (let player of players) {
      this.updatePlayer(player);
    }
  }

  create(): void {
    this.playerService.postPlayer(this.newPlayerName);
    this.newPlayerName = '';
  }

  keyup(event: any): void {
    if (event.keyCode == 13)
      this.create();
  }

  delete(player: Player): void {
    this.playerService.deletePlayer(player.id);
  }

  add(player: Player, delta: number): void {
    this.playerService.putPlayer(player.id, player.name, player.score + delta);
  }

  ngOnInit(): void {
    this.playerService.getPlayers();
  }
}
