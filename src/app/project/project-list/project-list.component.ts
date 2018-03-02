import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewProjectComponent } from './../new-project/new-project.component';
import { InviteComponent } from './../invite/invite.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      "name":"企业协作平台0",
      "desc":"这是一个企业内部项目0",
      "coverImg":"assets/covers/0.jpg"
    },{
      "name":"企业协作平台1",
      "desc":"这是一个企业内部项目1",
      "coverImg":"assets/covers/1.jpg"
    }
  ];

  constructor(
    private dialog: MdDialog
  ) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    // console.log('你点击了我');
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {'dark': true}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent, {data: {'dark': true}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
  
}
