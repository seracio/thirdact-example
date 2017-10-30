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
        <div
            style={{
                margin: 'auto',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '100vh'
            }}
        >
            <svg
                preserveAspectRatio="xMidYMid meet"
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
                                style={{ fill: 'transparent' }}
                            />
                        </Append>
                        <Transition duration={1000}>
                            <circle
                                cy={200}
                                style={{
                                    fill: 'blue'
                                }}
                            />
                        </Transition>
                    </Selection>
                    <Selection type="update">
                        <Transition duration={1000}>
                            <circle
                                cx={(d, i) => scaleX(i)}
                                style={{
                                    fill: 'red'
                                }}
                            />
                        </Transition>
                    </Selection>
                    <Selection type="exit">
                        <Transition duration={1000}>
                            <circle cy={250} r={5} style={{ fill: 'green' }} />
                        </Transition>
                        <Transition duration={500}>
                            <circle cy={400} style={{ fill: 'transparent' }} />
                        </Transition>
                        <Remove />
                    </Selection>
                </SelectAll>
            </svg>
        </div>
    );
};

const combinator = state => {
    return state.data$.map(data => ({ data }));
};

export default connect(combinator)(App);
