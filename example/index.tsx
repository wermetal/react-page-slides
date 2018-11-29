import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {MainPage} from './src/MainPage';
import {Settings} from "./src/models/Settings";
import {DatGuiWidget} from "./src/DatGuiWidget";

const app = document.createElement('div');
document.body.appendChild(app);

const settings = new Settings();


const datGuiWidget = new DatGuiWidget();
datGuiWidget.init(settings);
datGuiWidget.registerOnChange(() => {
    ReactDOM.render(
        <MainPage {...settings} onChange={onChangePageIndex}/>,
        app
    );
});
datGuiWidget.emitOnChange();

function onChangePageIndex(index: number) {
    settings.currentSlideIndex = index.toString();
    datGuiWidget.update()
}