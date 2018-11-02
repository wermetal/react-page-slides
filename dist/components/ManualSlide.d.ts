import * as React from 'react';
import './ManualSlide.css';
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
    getSliderStyles(): {
        height: string;
    };
    getBackgroundStyles(): React.CSSProperties;
    render(): JSX.Element;
}
export {};
