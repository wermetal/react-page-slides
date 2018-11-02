import * as React from 'react';
import * as PropTypes from 'prop-types';
import './AutoSlidesContainer.css';
import { ISlideConfig } from "../models/ISlideConfig";
interface IAutoSlidesContainerProps {
    height: number;
    transitionSpeed: number;
    slides: ISlideConfig[];
}
interface IAutoSlidesContainerState {
    startScroll: number;
    currentSlideIndex: number;
    transition: boolean;
    block: boolean;
}
export declare class AutoSlidesContainer extends React.Component<IAutoSlidesContainerProps, IAutoSlidesContainerState> {
    static propTypes: {
        height: PropTypes.Validator<number>;
        slides: PropTypes.Validator<any[]>;
        transitionSpeed: PropTypes.Validator<number>;
    };
    static defaultProps: {
        transitionSpeed: number;
    };
    state: {
        startScroll: number;
        currentSlideIndex: number;
        transition: boolean;
        block: boolean;
    };
    private touchStart;
    private prevWheel;
    private scrollValue;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleMouseWheel: (event: WheelEvent) => void;
    handleKeyDown: (event: KeyboardEvent) => void;
    handleTouchStart: (event: TouchEvent) => void;
    handleTouchMove: (event: TouchEvent) => void;
    updateCurrentPage(nextPage: boolean): void;
    renderSlides(): JSX.Element[];
    getHeight(): number;
    getScrollToTop(): number;
    onTransitionEnd: () => void;
    getContainerStyle(): {
        transform: string;
        transition: string;
    };
    render(): JSX.Element;
}
export {};
