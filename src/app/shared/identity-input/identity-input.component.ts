import { Component, OnInit, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { IdentityType, Identity } from '../../domain/user.model';
import { 
  ControlValueAccessor, 
  NG_VALUE_ACCESSOR, 
  NG_VALIDATORS, 
  FormControl, 
  FormGroup, 
  FormBuilder 
} from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-identity-input',
  templateUrl: './identity-input.component.html',
  styleUrls: ['./identity-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdentityInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
  identityTypes = [
    { value: IdentityType.IdCard, label: '身份证'},
    { value: IdentityType.Insurance, label: '医保'},
    { value: IdentityType.Passport, label: '护照'},
    { value: IdentityType.Military, label: '军官证'},
    { value: IdentityType.Other, label: '其他'}
  ];
  identity: Identity = {identityNo: null, identityType: null};

  private _idType = new Subject<IdentityType>();
  private _idNo = new Subject<string>();
  private propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
    const val$ = Observable.combineLatest(this._idNo, this._idType, (_no, _type) => {
      return {
        identityType: _type,
        identityNo: _no
      }
    })
  }
  
  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  onIdTypeChange(idType: IdentityType) {
    this._idType.next(idType);
  }

  onIdNoChange(idNo: string) {
    this._idNo.next(idNo);
  }

  get idType(): Observable<IdentityType> {
    return this._idType.asObservable();
  }

  get idNo(): Observable<string> {
    return this._idNo.asObservable();
  }
}
