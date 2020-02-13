import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';

import { Socket } from '../shared/interfaces';


declare var io: {
  connect(url: string): Socket;
};

@Injectable()
export class DataService {
  socket: Socket;
  dataObserver: Observer<JSON>;

  connectToSocket(): void {
    this.socket = socketIo('http://localhost:3000/data');
    console.log("initialised socker");
  }

  getDataObservable(): Observable<JSON> {
    this.socket.on('data', (res) => {
      this.dataObserver.next(res.data);
    });

    return new Observable<JSON>(obs => {
      this.dataObserver = obs;
    });
  }
}
