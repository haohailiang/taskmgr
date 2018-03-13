import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote: Quote = {
    cn: '好好学习, 天天向上',
    en: 'good good study, day day up !',
    pic: '/assets/quote_fallback.jpg'
  };
  constructor(private fb: FormBuilder, private quoteService$: QuoteService, private cd: ChangeDetectorRef) { 
    this.quoteService$.getQuote().subscribe(q => {
      this.quote = q;
      this.cd.markForCheck();
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['wang@163.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required]
    });
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
  }

  validate(c: FormControl): {[key: string]: any} {
    if(!c.value) {
      return null;
    }

    const pattern = /^wang+/;
    if(pattern.test(c.value)) {
      return null;
    }

    return {
      emailNotValid: '邮箱地址必须以wang开头'
    }
  }

}
