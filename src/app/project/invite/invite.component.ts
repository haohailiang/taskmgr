import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, OverlayContainer } from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
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
    private oc: OverlayContainer
  ) { }

  ngOnInit() {
    this.oc.themeClass = this.data.dark? 'myapp-dark-theme': null;
  }

  onClick() {
    this.dialogRef.close('from invite popup info ! ');
  }

  displayUser(user: {id: number, name: string}) {
    return user? user.name: '';
  }

}
