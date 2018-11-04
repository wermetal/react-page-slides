import * as React from 'react';
import {ISlideConfig} from "../models/ISlideConfig";
import {ISlideProps} from "../models/ISlideProps";
import {CSSProperties} from "react";

interface IManualSlideProps extends ISlideConfig, ISlideProps {
    scrollTop: number;
}

export class ManualSlide extends React.PureComponent<IManualSlideProps> {
    static defaultProps = {
        style: {}
    };

    getHeight() {
        return this.props.height;
    }

    render() {
        return (
            <div className="rps-slide" style={this.getSliderStyles()}>
                <div className="rps-slide__inner-container" style={this.getSlideInnerContainerStyles()}>
                    <div className="rps-slide-background" style={this.getBackgroundStyles()}/>
                    {this.props.content}
                </div>
            </div>
        )
    }

    private getSliderStyles() {
        return {
            height: `${this.getHeight()}px`,
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            boxSizing: 'border-box'
        } as CSSProperties;
    }

    private getBackgroundStyles() {
        let translateY = 0;

        if (this.props.isCurrent) {
            if (this.props.scrollTop !== 0) {
                translateY = -1 * (this.getHeight() - this.props.scrollTop) * this.getParallaxOffset();
            }
        } else {
            if (this.props.isBottom) {
                translateY = -1 * this.getHeight() * this.getParallaxOffset();
            }
        }

        return {
            backgroundSize: 'cover',
            ...this.props.style,
            height: `${this.getHeight()}px`,
            width: '100%',
            transform: `translateX(0px) translateY(${translateY}px)`,
            position: 'absolute',
            margin: 0,
            padding: 0,
            backfaceVisibility: 'hidden',
            top: 0,
            left: 0,
            zIndex: -1,
        } as React.CSSProperties;
    }

    private getParallaxOffset() {
        return this.props.parallax ? this.props.parallax.offset : 0;
    }


    private getSlideInnerContainerStyles() {
        return {
            height: `${this.getHeight()}px`,
            position: 'relative',
            width: '100%',
            overflow: 'hidden'
        } as CSSProperties;
    }
}