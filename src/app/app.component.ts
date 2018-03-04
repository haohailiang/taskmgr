import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkTheme = false;

  constructor(
    private oc: OverlayContainer
  ) {}

  switchDarkTheme(darkTheme: boolean): void {
    this.darkTheme = darkTheme;
    this.oc.themeClass = darkTheme? 'myapp-dark-theme': null;
  }
}
