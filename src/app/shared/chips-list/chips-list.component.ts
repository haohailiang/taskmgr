import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from '../../domain';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true
    },
  ]
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {

  @Input() placeholderText = '请输入成员email';
  @Input() multiple = true;
  @Input() label = '添加/修改成员';
  form: FormGroup;
  items: Array<User> = [];
  memberResults$: Observable<User[]>;

  constructor(private fb: FormBuilder, private service: UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    });

    this.memberResults$
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length > 1)
      .switchMap(str => this.service.searchUsers(str));
  }

  private propagateChange = (_: any) => {};

  writeValue(obj: Array<User>): void {
    if(this.multiple) {
      const userEntities = obj.reduce((e, c) => ({...e, c}), {});
      if(this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else {
      this.items = [...obj];
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }

  validate(c: FormControl): {[key: string]: any} {
    return this.items? null: {chipListInvalid: true};
  }

  removeMemeber(member: User) {
    const ids = this.items.map(item => item.id);
    const index = ids.indexOf(member.id);
    if(this.multiple) {
      this.items = [...this.items.slice(0, index), ...this.items.slice(index+1)];
    }else{
      this.items = [];
    }
    this.form.patchValue({memberSearch: ''});
    this.propagateChange(this.items);
  }

  handleMemberSelection(member: User) {
    if(this.items.map(item => item.id).indexOf(member.id) !== -1) {
      return;
    }
    this.items = this.multiple? [...this.items, member]: [member];
    this.form.patchValue({memberSearch: member.name});
    this.propagateChange(this.items);
  }

  displayUser(user: User): string {
    return user? user.name: '';
  }

  get displayInput() {
    return this.multiple || this.items.length === 0;
  }

}
