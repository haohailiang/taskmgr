import { Component, OnInit, Input, Output, EventEmitter, HostListener, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { itemAnim } from '../../anims/item.anim';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [
    itemAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Input() avatar;
  // @Output() itemClick = new EventEmitter<void>();
  @Output() taskClick = new EventEmitter<void>();
  widerPriority = 'in'; 

  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner? this.item.owner.avatar: 'unassigned';
  }

  onItemClick() {
    this.taskClick.emit();
  }

  onCheckboxClick(evt: Event) {
    evt.stopPropagation();
  }

  onMouseEnter() {
    this.widerPriority = 'out';
  }

  onMouseLeave() {
    this.widerPriority = 'in'
  }
}
