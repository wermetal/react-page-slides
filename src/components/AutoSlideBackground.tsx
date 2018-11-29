import * as React from "react";
import {CSSProperties} from "react";
import {SlideParallaxType} from "../models/SlideParallaxType";

interface IAutoSlideBackgroundProps {
    transitionSpeed: number;
    parallaxType: SlideParallaxType;
    parallaxOffset: number;
    isBottom: boolean;
    isCurrent: boolean;
    isTop: boolean;
    height: number;
    style: CSSProperties;
}

export class AutoSlideBackground extends React.PureComponent<IAutoSlideBackgroundProps> {
    render() {
        return (
            <div className="rps-slide-background" style={this.getBackgroundStyles()}/>
        );
    }

    private getBackgroundStyles(): CSSProperties {
        let translateY = 0;
        const {
            height,
            parallaxType,
            parallaxOffset
        } = this.props;
        if (this.props.isBottom && parallaxType === SlideParallaxType.reveal) {
            translateY = -1 * parallaxOffset * height;
        }
        if (this.props.isTop && parallaxType === SlideParallaxType.cover) {
            translateY = parallaxOffset * height;
        }

        let styles = {
            backgroundSize: 'cover',
            ...this.props.style,
            margin: 0,
            padding: 0,
            backfaceVisibility: 'hidden',
            height: `${height}px`,
            width: '100%',
            transform: `translateX(0px) translateY(${translateY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
        };
        if (this.props.isCurrent
            || this.props.isBottom && parallaxType === SlideParallaxType.reveal
            || this.props.isTop && parallaxType === SlideParallaxType.cover
        ) {
            styles = {
                ...styles,
                transition: `all ${this.props.transitionSpeed}ms ease`,
            };
        }

        return styles as CSSProperties;
    }
}