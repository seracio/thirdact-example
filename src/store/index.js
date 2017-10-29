// @flow
import { range } from 'd3-array';
import { interpolateGnBu } from 'd3-scale-chromatic';
import xs from 'xstream';

export const data$ = xs
    // each seconds
    .periodic(1500)
    //
    .map(tick => {
        const numElements = Math.floor(Math.random() * 15);
        return range(0, numElements).map(() => interpolateGnBu(Math.random()));
    })
    // memory
    .remember();
