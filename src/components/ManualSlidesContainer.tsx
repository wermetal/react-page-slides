import * as React from 'react';
import {ManualSlide} from './ManualSlide';
import {ISlideConfig} from "../models/ISlideConfig";
import {CSSProperties} from "react";
import {ISlidePrallaxConfig} from "../models/ISlidePrallaxConfig";

interface IManualSlidesContainerProps {
    height: number;
    enableAutoScroll: boolean;
    slides: ISlideConfig[];
    parallax: ISlidePrallaxConfig;
    currentSlideIndex: number;
    onChange?: (index: number) => void;
}

interface IManualSlidesContainerState {
    scrollToTop: number;
    currentSlideIndex: number;
    userSlideIndex?: number;
    transition: boolean;
    scrollTop: number,
    block: boolean;
}

export class ManualSlidesContainer extends React.PureComponent<IManualSlidesContainerProps, IManualSlidesContainerState> {
    static defaultProps = {
        enableAutoScroll: false,
        onChange: () => {}
    };

    static isValidSlideIndex(slideIndex: number, props: IManualSlidesContainerProps) {
        return slideIndex < props.slides.length && slideIndex >= 0
    }

    public state = {
        scrollToTop: 0,
        currentSlideIndex: 0,
        transition: false,
        scrollTop: 0,
        block: false
    };

    private container: HTMLDivElement;


    componentDidMount() {
        this.container.addEventListener('scroll', (event) => {
            const target = event.target as HTMLDivElement;
            if (!this.props.enableAutoScroll && target) {
                const currentSlideIndex = Math.ceil(target.scrollTop / this.getHeight());
                const scrollTop = target.scrollTop % this.getHeight();
                if (this.state.currentSlideIndex !== currentSlideIndex) {
                    this.setState({
                        scrollTop,
                        currentSlideIndex
                    });
                } else {
                    this.setState({
                        scrollTop
                    });
                }
            }
        });
    }

    componentDidUpdate(prevProps: IManualSlidesContainerProps, prevState: IManualSlidesContainerState) {
        if (prevState.currentSlideIndex !== this.state.currentSlideIndex) {
            this.props.onChange!(this.state.currentSlideIndex);
        }
        if (typeof this.props.currentSlideIndex !=='undefined'
            && this.props.currentSlideIndex !== prevProps.currentSlideIndex
            && ManualSlidesContainer.isValidSlideIndex(this.props.currentSlideIndex, this.props)
        ) {
            this.container.scrollTop = this.getHeight() * this.props.currentSlideIndex
        }
    }

    getHeight() {
        return this.props.height;
    }

    renderSlides() {
        const height = this.getHeight();
        return this.props.slides.map((props, index) => {
            const isCurrent = index === this.state.currentSlideIndex;
            const isBottom = index > this.state.currentSlideIndex;
            const isTop = index < this.state.currentSlideIndex;

            return (
                <ManualSlide
                    {...props}
                    isCurrent={isCurrent}
                    isTop={isTop}
                    isBottom={isBottom}
                    scrollTop={isCurrent || isTop ? this.state.scrollTop : 0}
                    parallax={this.props.parallax}
                    height={height}
                    key={index}
                />
            );
        });
    }

    render() {
        return (
            <div className="rps-manual-slides-container"
                 style={this.getContainerStyle()}
                 ref={(ref: HTMLDivElement) => {
                     this.container = ref
                 }}
            >
                {this.renderSlides()}
            </div>
        )
    }

    private getContainerStyle() {
        const height = this.getHeight();
        return {
            height: `${height}px`,
            position: 'relative',
            touchAction: 'none',
            padding: 0,
            margin: 0,
            transform: 'translate3d(0px, 0px, 0px)',
            transition: 'none 0s ease 0s',
            overflow: 'scroll',
            WebkitOverflowScrolling: 'touch'
        } as CSSProperties;
    }
}