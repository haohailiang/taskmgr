import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
import { 
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Address } from '../../domain/user.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AreaListComponent),
      multi: true
    }
  ]
})
export class AreaListComponent implements OnInit, OnDestroy, ControlValueAccessor {

  _address: Address = {
    province: '',
    city: '',
    district: '',
    street: ''
  }
  _province = new Subject();
  _city = new Subject();
  _district = new Subject();
  _street = new Subject();
  provinces$: Observable<string>;
  cities$: Observable<string>;
  districts$: Observable<string>;
  sub: Subscription;
  private propagateChange = (_: any) => {};

  constructor() { }

  ngOnInit() {
    const provinces$ = this._province.asObservable().startWith('');
    const cities$ = this._city.asObservable().startWith('');
    const districts$ = this._district.asObservable().startWith('');
    const street$ = this._street.asObservable().startWith('');
    const val$ = Observable.combineLatest(([provinces$, cities$, districts$, street$]), (_p, _c, _d, _s) => ({
      province: _p,
      city: _c,
      district: _d,
      street: _s
    }));
    this.sub = val$.subscribe(v => this.propagateChange(v));
    this.provinces$ = Observable.of(getProvinces());
    this.cities$ = provinces$.map(p => getCitiesByProvince(p));
    this.districts$ = Observable.combineLatest(provinces$, cities$, (_p, _c) => getAreaByCity(_p, _c));
    
  }

  writeValue(obj: Address): void {
    if(obj) {
      this._address = obj;
    }
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
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

  onProvinceChange() {
    this._province.next(this._address.province);
  }
  onCityChange() {
    this._city.next(this._address.city);
  }
  onDistrictChange() {
    this._district.next(this._address.district);
  }
  onStreetChange() {
    this._street.next(this._address.street);
  }
  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if(!val) {
      return null;
    }
    if(val.province && val.city && val.district && val.street) {
      return null;
    }
    return {'addressInvalid': true};
  }
}
