import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';

import { Socket } from '../shared/interfaces';
import { ConfigJSON } from '../shared/config';


declare var io: {
  connect(url: string): Socket;
};

@Injectable()
export class DataService {
  socket: Socket;
  stateObserver: Observer<JSON>;
  configObserver: Observer<JSON>;
  config: ConfigJSON;

  connectToSocket(): void {
    this.socket = socketIo('http://localhost:3000');

    this.socket.on('config', (res) => {
      this.config = <ConfigJSON>res.config;
      console.log(`got config ${JSON.stringify(this.config)}`);
    });
  }

  getStateObservable(): Observable<JSON> {
    this.socket.on('data', (res) => {
      this.stateObserver.next(res.data);
    });

    return new Observable<JSON>(obs => {
      this.stateObserver = obs;
    });
  }

  getConfigObservable(): Observable<JSON> {
    this.socket.on('config', (res) => {
      this.configObserver.next(res.config);
    });

    return new Observable<JSON>(obs => {
      this.configObserver = obs;
    });
  }

  private handleError(error) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Socket.io server error');
  }
}
