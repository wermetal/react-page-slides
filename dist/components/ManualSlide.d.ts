import * as React from 'react';
import { ISlideConfig } from "../models/ISlideConfig";
import { ISlideProps } from "../models/ISlideProps";
interface IManualSlideProps extends ISlideConfig, ISlideProps {
    scrollTop: number;
}
export declare class ManualSlide extends React.PureComponent<IManualSlideProps> {
    static defaultProps: {
        style: {};
    };
    getHeight(): number;
    render(): JSX.Element;
    private getSliderStyles;
    private getBackgroundStyles;
    private getParallaxOffset;
    private getSlideInnerContainerStyles;
}
export {};
