// @flow
// eslint-disable-next-line
import * as d3 from 'd3-selection';
import 'd3-selection-multi';
import 'd3-transition';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from '@seracio/xstream-connect';
import App from './components/App';
import * as store from './store';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    // $FlowFixMe
    document.querySelector('#root')
);
