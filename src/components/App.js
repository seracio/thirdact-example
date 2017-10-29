// @flow
import { scaleLinear } from 'd3-scale';
import React from 'react';
import { connect } from '@seracio/xstream-connect';
import {
    SelectAll,
    Transition,
    Selection,
    Append,
    Remove
} from '@seracio/thirdact';

type Props = {
    data: Array<any>
};

const App = ({ data }: Props) => {
    const size = 500;

    const scaleX = scaleLinear()
        .domain([0, data.length - 1])
        .range([100, 400]);

    return (
        <svg
            preserveAspectRatio="xMinYMin meet"
            viewBox={`0 0 ${size} ${size}`}
        >
            <text
                x={size / 2}
                y={50}
                style={{
                    alignmentBaseline: 'middle',
                    textAnchor: 'middle',
                    fontFamily: 'sans-serif'
                }}
            >
                Hello thirdact
            </text>
            <SelectAll data={data} selector={'.circle'} root={<g />}>
                <Selection type="enter">
                    <Append>
                        <circle
                            className="circle"
                            cx={(d, i) => scaleX(i)}
                            cy={100}
                            r={10}
                            fill={'transparent'}
                        />
                    </Append>
                    <Transition duration={1000}>
                        <circle cy={200} fill={d => d} />
                    </Transition>
                </Selection>
                <Selection type="update">
                    <Transition duration={1000}>
                        <circle
                            cy={200}
                            cx={(d, i) => scaleX(i)}
                            fill={d => d}
                        />
                    </Transition>
                </Selection>
                <Selection type="exit">
                    <Transition duration={1000}>
                        <circle cy={300} fill={'transparent'} />
                    </Transition>
                    <Remove />
                </Selection>
            </SelectAll>
        </svg>
    );
};

const combinator = state => {
    return state.data$.map(data => ({ data }));
};

export default connect(combinator)(App);
