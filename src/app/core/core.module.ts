import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
// import { SharedModule } from './../shared/shared.module';
import { 
  MdToolbarModule,
  MdIconModule,
  MdButtonModule,
  MdCardModule
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { loaderSvgResources } from '../util/svg.util';

@NgModule({
  imports: [
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
  // SharedModule,
    CommonModule,
    HttpModule,
  ],
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent
  ]
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parent: CoreModule,
    iconRegistry: MdIconRegistry, 
    sanitizer: DomSanitizer
  ) {
    if(parent) {
      throw new Error('模块已经加载,不能重复加载!');
    }
    loaderSvgResources(iconRegistry, sanitizer);
  }
 }
