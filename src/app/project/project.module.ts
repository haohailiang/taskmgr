import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { InviteComponent } from './invite/invite.component';
import { ProjectRoutingModule } from './project-routing.module';

import { MdDialogModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
    MdDialogModule,
  ],
  declarations: [
    ProjectListComponent, 
    ProjectItemComponent, 
    NewProjectComponent, 
    InviteComponent
  ],
  entryComponents: [
    NewProjectComponent,
    InviteComponent
  ],
  providers: [
    // MdDialog
  ]
})
export class ProjectModule { }
