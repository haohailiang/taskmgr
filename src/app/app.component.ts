import { Component, Inject } from '@angular/core';
import { OverlayContainer } from '@angular/material';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('square', [
      state('green', style({'background-color': 'green', 'height': '100px', 'transform': 'translateX(0)'})),
      state('red', style({'background-color': 'red', 'height': '50px', 'transform': 'translateX(100%)'})),
      transition('green => red', animate('5s')),
      transition('red => green', animate('5s', keyframes([
        style({'background-color': 'red'}),
        style({'background-color': 'green'}),
        style({'background-color': 'blue'})
      ])))
    ])
  ]
})
export class AppComponent {
  squareState: string;
  darkTheme = false;

  constructor(
    private oc: OverlayContainer,
    @Inject('BASE_CONFIG') config
  ) {
    console.log('config: ' + config);
  }

  switchDarkTheme(darkTheme: boolean): void {
    this.darkTheme = darkTheme;
    this.oc.themeClass = darkTheme? 'myapp-dark-theme': null;
  }

  onClick() {
    this.squareState = this.squareState === 'green'? 'red': 'green';
  }
}
