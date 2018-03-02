import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkTheme = false;

  constructor() {}

  switchDarkTheme(darkTheme: boolean): void {
    this.darkTheme = darkTheme;
    console.log(this.darkTheme);
  }
}
