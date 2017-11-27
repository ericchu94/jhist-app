import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class PlayerService {
  private endpoint = 'http://home.ericchu.net:3001/';
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io.connect(this.endpoint);
  }

  on(event: string, fn: Function): SocketIOClient.Emitter {
    return this.socket.on(event, fn);
  }

  getPlayers(): void {
    this.socket.emit('getPlayers');
  }

  postPlayer(name: string): void {
    this.socket.emit('postPlayer', {
      name: name,
    });
  }

  getPlayer(id: number): void {
    this.socket.emit('getPlayer', {
      id: id,
    });
  }

  putPlayer(id: number, name?: string, score?: number): void {
    this.socket.emit('putPlayer', {
      id: id,
      name: name,
      score: score,
    });
  }

  deletePlayer(id: number): void {
    this.socket.emit('deletePlayer', {
      id: id,
    });
  }
}
