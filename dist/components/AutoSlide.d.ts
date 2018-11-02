import * as React from 'react';
import './AutoSlide.css';
import { ISlideConfig } from "../models/ISlideConfig";
import { CSSProperties } from "react";
import { ISlideProps } from "../models/ISlideProps";
interface IAutoSlide extends ISlideConfig, ISlideProps {
    transitionSpeed: number;
}
export declare class AutoSlide extends React.PureComponent<IAutoSlide> {
    static defaultProps: {
        style: {};
    };
    getHeight(): number;
    getSliderStyles(): {
        height: string;
    };
    getBackgroundStyles(): CSSProperties;
    render(): JSX.Element;
}
export {};
