import * as QuoteAction from './../actions/quote.action';
import { Quote } from '../domain/quote.model';

export interface State {
    quote: Quote;
};

export const initialState: State = {
    quote: {
        cn: '好好学习, 天天向上',
        en: 'good good study, day day up !',
        pic: '/assets/quote_fallback.jpg'
    }
};

export function reducer(state = initialState, action: {type: string, payload: any} ): State {
    switch (action.type) {
        case QuoteAction.QUOTE_SUCCESS: {
            return {
                ...state, quote: action.payload
            };
        }
        case QuoteAction.QUOTE_FAIL: 
        default: {
            return state;
        }
    }
}