import * as React from 'react';
import {ISlideConfig} from "../models/ISlideConfig";
import {CSSProperties} from "react";
import {ISlideProps} from "../models/ISlideProps";

interface IAutoSlide extends ISlideConfig, ISlideProps {
    transitionSpeed: number;
}

export class AutoSlide extends React.PureComponent<IAutoSlide> {
    static defaultProps = {
        style: {}
    };

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

    private getHeight() {
        return this.props.height;
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

    private getSlideInnerContainerStyles() {
        return {
            height: `${this.getHeight()}px`,
            position: 'relative',
            width: '100%',
            overflow: 'hidden'
        } as CSSProperties;
    }

    private getParallaxOffset() {
        return this.props.parallax ? this.props.parallax.offset : 0;
    }

    private getBackgroundStyles(): CSSProperties {
        let translateY = 0;
        if (this.props.isBottom) {
            translateY = -1 * this.getParallaxOffset() * this.getHeight();
        }
        let styles = {
            backgroundSize: 'cover',
            ...this.props.style,
            margin: 0,
            padding: 0,
            backfaceVisibility: 'hidden',
            height: `${this.getHeight()}px`,
            width: '100%',
            transform: `translateX(0px) translateY(${translateY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
        };
        if (this.props.isBottom || this.props.isCurrent) {
            styles = {
                ...styles,
                transition: `all ${this.props.transitionSpeed}ms ease`,
            };
        }

        return styles as CSSProperties;
    }
}