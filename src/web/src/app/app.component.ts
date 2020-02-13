import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './core/data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  sub: Subscription;
  data: JSON

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.connectToSocket();

    this.sub = this.dataService.getDataObservable()
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
