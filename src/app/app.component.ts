import { Component, Inject } from '@angular/core';
import { OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
}
