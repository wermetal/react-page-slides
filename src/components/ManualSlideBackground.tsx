import * as React from "react";
import {SlideParallaxType} from "../models/SlideParallaxType";
import {CSSProperties} from "react";

interface IManualSlideProps {
    scrollTop: number;
    parallaxType: SlideParallaxType;
    parallaxOffset: number;
    isBottom: boolean;
    isCurrent: boolean;
    isTop: boolean;
    height: number;
    style: CSSProperties;
}

export class ManualSlideBackground extends React.PureComponent<IManualSlideProps> {
    render() {
        return (
            <div className="rps-slide-background" style={this.getBackgroundStyles()}/>
        );
    }

    private getBackgroundStyles() {
        let translateY = 0;
        const {
            height,
            parallaxType,
            parallaxOffset
        } = this.props;
        if (this.props.isCurrent && parallaxType === SlideParallaxType.reveal) {
            if (this.props.scrollTop !== 0) {
                translateY = -1 * (height - this.props.scrollTop) * parallaxOffset;
            }
        }
        if (this.props.isTop && parallaxType === SlideParallaxType.cover) {
            translateY = (this.props.scrollTop) * parallaxOffset;
        }

        return {
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
        } as React.CSSProperties;
    }
}