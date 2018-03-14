import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, OverlayContainer } from '@angular/material';
import { User } from '../../domain';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {
  members: Array<User> = [];

  items = [
    {
      id:1,
      name:'熊大'
    },{
      id:2,
      name:'熊二'
    },{
      id:3,
      name:'光头强'
    }
  ];

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<InviteComponent>,
    // private oc: OverlayContainer
  ) { }

  ngOnInit() {
    // this.oc.themeClass = this.data.dark? 'myapp-dark-theme': null;
    this.members = [...this.data.members];
  }

  onClick() {
    this.dialogRef.close('from invite popup info ! ');
  }

  displayUser(user: {id: number, name: string}) {
    return user? user.name: '';
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if(!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }

}
