import * as React from 'react';
import {ISlideConfig} from "../models/ISlideConfig";
import {CSSProperties} from "react";
import {ISlidePrallaxConfig} from "../models/ISlidePrallaxConfig";
import {Slide} from "./Slide";
import {ManualSlideBackground} from "./ManualSlideBackground";

interface IManualSlidesContainerProps {
    height: number;
    enableAutoScroll: boolean;
    slides: ISlideConfig[];
    parallax: ISlidePrallaxConfig;
    currentSlideIndex?: number;
    onChange?: (index: number) => void;
}

interface IManualSlidesContainerState {
    currentSlideIndex: number;
    scrollTop: number,
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
        currentSlideIndex: 0,
        scrollTop: 0,
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
                <Slide height={height} key={index}>
                    <ManualSlideBackground
                        scrollTop={isCurrent || isTop ? this.state.scrollTop : 0}
                        parallaxType={this.props.parallax.type}
                        parallaxOffset={this.props.parallax.offset}
                        isBottom={isBottom}
                        isCurrent={isCurrent}
                        isTop={isTop}
                        height={this.getHeight()}
                        style={props.style}
                    />
                    {props.content}
                </Slide>
            );
        });
    }

    render() {
        return (
            <div style={this.getContainerStyle()}
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