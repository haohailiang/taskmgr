import { Component, OnInit, HostBinding } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from './../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anims/router.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {
  @HostBinding('@routeAnim') state;
  
  lists = [];
  items = [
    {
      id: 1,
      name: '待办',
      tasks: [
        {
          id: 1,
          desc: '任务一: 去星巴克买杯咖啡',
          priority: 1,
          completed: true,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: true
        },
        {
          id: 1,
          desc: '任务二: 完成老板布置的PPT作业',
          priority: 2,
          completed: false,
          owner: {
            id: 1,
            name: '张三',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
          reminder: false
        }
      ]
    },
    {
      id: 2,
      name: '进行中',
      tasks: [
        {
          id: 1,
          desc: '任务三：项目代码评审',
          priority: 3,
          owner: {
            id: 1,
            name: '王五',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
          reminder: true
        },{
          id: 2,
          desc: '任务四：制定项目计划',
          priority: 2,
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
          reminder: false
        }
      ]
    }
  ];

  constructor(
    private dialog: MdDialog
  ) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    this.dialog.open(NewTaskComponent, {data: {title:'新建任务'}});
  }

  launchCopyTaskDialog() {
    this.dialog.open(CopyTaskComponent, {data: {lists: this.items}});
  }

  launchUpdateTaskDialog(task) {
    this.dialog.open(NewTaskComponent, {data: {title:'修改任务', task: task}});
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title:'删除任务列表', content: '你确定删除该项目列表吗?'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title:'更改列表名称'}});
    dialogRef.afterClosed().subscribe(result => console.log('更改的列表名称为:' + result));
  }

  launchNewListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title:'新建列表'}});
    dialogRef.afterClosed().subscribe(result => console.log('新建的列表名称为:' + result));
  }

}
