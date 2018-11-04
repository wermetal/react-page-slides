import * as React from 'react';
import { ISlideConfig } from "../models/ISlideConfig";
interface IManualSlidesContainerProps {
    height: number;
    enableAutoScroll: boolean;
    slides: ISlideConfig[];
}
interface IManualSlidesContainerState {
    scrollToTop: number;
    currentSlideIndex: number;
    transition: boolean;
    scrollTop: number;
    block: boolean;
}
export declare class ManualSlidesContainer extends React.PureComponent<IManualSlidesContainerProps, IManualSlidesContainerState> {
    static defaultProps: {
        enableAutoScroll: boolean;
    };
    state: {
        scrollToTop: number;
        currentSlideIndex: number;
        transition: boolean;
        scrollTop: number;
        block: boolean;
    };
    private container;
    componentDidMount(): void;
    getHeight(): number;
    renderSlides(): JSX.Element[];
    render(): JSX.Element;
    private getContainerStyle;
}
export {};
