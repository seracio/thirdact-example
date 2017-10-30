// @flow
import { range } from 'd3-array';
import xs from 'xstream';

export const data$ = xs
    // each two seconds
    .periodic(2000)
    //
    .map(tick => {
        const numElements = Math.floor(Math.random() * 15);
        return range(0, numElements);
    })
    // memory
    .remember();
