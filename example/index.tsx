import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MainPage} from './src/MainPage';

const app = document.createElement('div');
document.body.appendChild(app);

ReactDOM.render(
    <MainPage />,
    app
);
