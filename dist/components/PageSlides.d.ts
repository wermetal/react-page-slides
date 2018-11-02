import * as React from 'react';
import { AutoSlidesContainer } from './AutoSlidesContainer';
import { ManualSlidesContainer } from './ManualSlidesContainer';
import './PageSlides.css';
import { ISlideConfig } from "../models/ISlideConfig";
interface IPageSlidesProps {
    enableAutoScroll: boolean;
    transitionSpeed: number;
    slides: ISlideConfig[];
}
interface IPageSlidesState {
    height: number;
}
export declare class PageSlides extends React.Component<IPageSlidesProps, IPageSlidesState> {
    static defaultProps: {
        enableAutoScroll: boolean;
        transitionSpeed: number;
    };
    state: {
        height: number;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    onResize: () => void;
    getHeight(): number;
    getSlidesComponent(): typeof AutoSlidesContainer | typeof ManualSlidesContainer;
    render(): JSX.Element;
}
export {};
