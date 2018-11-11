import * as React  from 'react';
import * as PropTypes from 'prop-types';
import {AutoSlide} from './AutoSlide';

import {ISlideConfig} from "../models/ISlideConfig";
import {CSSProperties} from "react";
import {ISlidePrallaxConfig} from "../models/ISlidePrallaxConfig";

interface IAutoSlidesContainerProps {
    height: number;
    transitionSpeed: number;
    slides: ISlideConfig[];
    parallax: ISlidePrallaxConfig;
}

interface IAutoSlidesContainerState {
    startScroll: number;
    currentSlideIndex: number;
    transition: boolean;
    block: boolean;
}

export class AutoSlidesContainer extends React.Component<IAutoSlidesContainerProps, IAutoSlidesContainerState> {
    public static propTypes = {
        height: PropTypes.number.isRequired,
        slides: PropTypes.array.isRequired,
        transitionSpeed: PropTypes.number.isRequired
    };

    public static defaultProps = {
        transitionSpeed: 2000
    };

    public state = {
        startScroll: 0,
        currentSlideIndex: 0,
        transition: false,
        block: false
    };

    private touchStart: number;
    private prevWheel = 0;
    private  scrollValue = 0;

    componentDidMount() {
        window.addEventListener('wheel', this.handleMouseWheel, {passive: false});
        window.addEventListener('DOMMouseScroll', this.handleMouseWheel, {passive: false});
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('touchstart', this.handleTouchStart);
        window.addEventListener('touchmove', this.handleTouchMove, {passive: false});
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.handleMouseWheel);
        window.removeEventListener('DOMMouseScroll', this.handleMouseWheel);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchmove', this.handleTouchMove);
    }

    handleMouseWheel = (event: MouseWheelEvent) => {
        event.preventDefault();
        if (!this.state.block) {
            const delta = event.wheelDelta || -event.deltaY;
            if (this.prevWheel < Math.abs(delta)) {
                if (delta < 0) {
                    this.scrollValue--;
                } else if (delta > 0) {
                    this.scrollValue++;
                }
            }
            this.prevWheel = Math.abs(delta);

            if (Math.abs(this.scrollValue) > 5) {
                this.updateCurrentPage(delta < 0);
                this.scrollValue = 0;
            }
        }
    };

    handleKeyDown = (event: KeyboardEvent) => {
        if (!this.state.block) {
            if (event.keyCode === 38) {
                this.updateCurrentPage(false);
            }
            if (event.keyCode === 40) {
                this.updateCurrentPage(true);
            }
        }
    };

    handleTouchStart = (event: TouchEvent) => {
        this.touchStart = event.touches[0].pageY;
    };

    handleTouchMove = (event: TouchEvent) => {
        event.preventDefault();
        if (!this.state.block) {
            const touchDelta = event.touches[0].pageY - this.touchStart;
            if (Math.abs(touchDelta) > 30) {
                this.updateCurrentPage(touchDelta < 0);
                this.touchStart = event.touches[0].pageY;
            }
        }
    };

    updateCurrentPage(nextPage: boolean) {
        const currentSlideIndex = (nextPage ? 1 : -1) + this.state.currentSlideIndex;
        if (currentSlideIndex < this.props.slides.length && currentSlideIndex >= 0) {
            this.setState({
                currentSlideIndex,
                transition: true,
                block: true
            });
        }
    }

    getHeight() {
        return this.props.height;
    }

    renderSlides() {
        const height = this.getHeight();
        return this.props.slides.map((props, index) => {
            const isCurrent = index === this.state.currentSlideIndex;
            const isTop = index < this.state.currentSlideIndex;
            const isBottom = index > this.state.currentSlideIndex;
            return (
                <AutoSlide
                    {...props}
                    isCurrent={isCurrent}
                    isTop={isTop}
                    isBottom={isBottom}
                    transitionSpeed={this.props.transitionSpeed}
                    parallax={this.props.parallax}
                    height={height}
                    key={index}/>
            );
        });
    }

    getScrollToTop() {
        return this.state.currentSlideIndex * this.getHeight() * -1;
    }

    onTransitionEnd = () => {
        this.setState({
            block: false,
            transition: false
        });
    };

    render() {
        return (
            <div className="rps-auto-slides-container"
                 style={this.getContainerStyle()}
                 onTransitionEnd={this.onTransitionEnd}
            >
                {this.renderSlides()}
            </div>
        )
    }

    private getContainerStyle() {
        const scrollToTop = this.getScrollToTop();
        return {
            transform: `translate3d(0px, ${scrollToTop}px, 0px)`,
            transition: `all ${this.props.transitionSpeed}ms ease`,
            height: '100%',
            position: 'relative',
            touchAction: 'none',
            padding: 0,
            margin: 0
        } as CSSProperties;
    }
}