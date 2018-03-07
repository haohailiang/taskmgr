import { Component, Inject } from '@angular/core';
import { OverlayContainer } from '@angular/material';
import { trigger, state, animation, style} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('square', [state('green', style({'background-color': 'green'}))])
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
    this.squareState = this.squareState? null: 'green';
  }
}
