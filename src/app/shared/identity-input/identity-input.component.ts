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
import { Subscription } from 'rxjs/Subscription';

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
  private sub: Subscription;

  constructor() { }

  ngOnInit() {
    const val$ = Observable.combineLatest(this._idNo, this._idType, (_no, _type) => {
      return {
        identityType: _type,
        identityNo: _no
      }
    });
    this.sub = val$.subscribe(id => this.propagateChange(id));
  }
  
  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if(!val) {
      return null;
    }
    switch(val.identityType) {
      case IdentityType.IdCard: 
        return this.validateIdCard(c);
      case IdentityType.Passport: 
        return this.validatePassport(c);
      case IdentityType.Military:
        return this.validateMilitary(c);
      case IdentityType.Insurance:
      default:
        return null;
    }
  }
  validateIdCard(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if(val.length !== 18) {
      return {'idInvalid': true};
    }

    const pattern = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[x0-9]$/;
    return pattern.test(val)? null: {'idNotValid': true};
  }

  private validatePassport(c: FormControl): {[key: string]: any} {
    const value = c.value.identityNo;
    if (value.length !== 9) {
      return {idNotValid: true};
    }
    const pattern = /^[GgEe]\d{8}$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

  private validateMilitary(c: FormControl): {[key: string]: any} {
    const value = c.value.identityNo;
    const pattern = /[\u4e00-\u9fa5](字第)(\d{4,8})(号?)$/;
    let result = false;
    if (pattern.test(value)) {
      result = true;
    }
    return result ? null : {idNotValid:  true};
  }

  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
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
