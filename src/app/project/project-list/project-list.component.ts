import { 
  Component, 
  OnInit, 
  OnDestroy,
  HostBinding,
  ChangeDetectionStrategy, 
  ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewProjectComponent } from './../new-project/new-project.component';
import { InviteComponent } from './../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from '../../services/project.service';
import * as _ from 'lodash';
import { Project } from '../../domain';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight, listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnim') state;
  
  // projects = [
  //   {
  //     "id":1,
  //     "name":"企业协作平台0",
  //     "desc":"这是一个企业内部项目0",
  //     "coverImg":"assets/covers/0.jpg"
  //   },{
  //     "id":2,
  //     "name":"企业协作平台1",
  //     "desc":"这是一个企业内部项目1",
  //     "coverImg":"assets/covers/1.jpg"
  //   }
  // ];
  projects: Array<Project>;
  sub: Subscription;

  constructor(
    private dialog: MdDialog,
    private cd: ChangeDetectorRef,
    private service$: ProjectService
  ) { }

  ngOnInit() {
    this.service$.get("1").subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  openNewProjectDialog() {
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef = this.dialog.open(
      NewProjectComponent, 
      {data: {thumbnails: this.getThumbnails(), img: selectedImg}}
      // {data: {title: '新增项目'}}
    );
    dialogRef.afterClosed().subscribe(project => {
      this.service$.add(project);
      // this.projects = [...this.projects, 
      //   { "id": "3", "name": "一个新项目", "desc": "这是一个新项目", "coverImg": "assets/covers/8.jpg" },
      //   { "id": "4", "name": "又一个新项目", "desc": "这是又一个新项目", "coverImg": "assets/covers/9.jpg" }
      // ];
      this.cd.markForCheck();
    });
  }

  launchInviteDialog() {
    // const dialogRef = this.dialog.open(InviteComponent, {data: {'dark': true}});
    const dialogRef = this.dialog.open(InviteComponent);
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchUpdateDialog() {
    this.dialog.open(NewProjectComponent, {data: {title: '编辑项目'}});
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '你确认删除该项目吗?'}})
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .switchMap(_ => this.service$.del(project))
      .subscribe(prj => {
        this.projects = this.projects.filter( p => p.id !== prj.id);
        this.cd.markForCheck();
    });
  }

  private getThumbnails()  {
    return _.range(0, 40)
            .map(i => `/assets/covers/${i}_tn.jpg`)
  }
  
}
