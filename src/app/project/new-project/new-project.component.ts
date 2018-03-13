import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef, OverlayContainer } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {
  title = '';
  coverImages = [];
  form: FormGroup;

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<NewProjectComponent>,
    private fb: FormBuilder
    // private oc: OverlayContainer
  ) { }

  ngOnInit() {
    this.coverImages = this.data.thumbnails;
    // this.oc.themeClass = this.data.dark? 'myapp-dark-theme': null;
    if(this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.title = '修改项目';
    }else{
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [''],
        coverImg: ['']
      });
      this.title = '创建项目';
    }
    // this.title = this.data.title;
    // console.log('new-project: ' + JSON.stringify(this.data));
  }

  onClick() {
    this.dialogRef.close('i receive your message ! ');
  }

  onSubmit({value, valid}, ev: Event): void {
    ev.preventDefault();
    if(!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

}
