import * as React from 'react';
import { ISlideConfig } from "../models/ISlideConfig";
import { ISlideProps } from "../models/ISlideProps";
interface IAutoSlide extends ISlideConfig, ISlideProps {
    transitionSpeed: number;
}
export declare class AutoSlide extends React.PureComponent<IAutoSlide> {
    static defaultProps: {
        style: {};
    };
    render(): JSX.Element;
    private getHeight;
    private getSliderStyles;
    private getSlideInnerContainerStyles;
    private getParallaxOffset;
    private getBackgroundStyles;
}
export {};
